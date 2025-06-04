const express = require('express');
const session = require('express-session');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
var path = require('path');
const coreAuthRouter = require('./routes/coreRoutes/coreAuth');
const coreApiRouter = require('./routes/coreRoutes/coreApi');
const adminAuth = require('./controllers/coreControllers/adminAuth');
const errorHandlers = require('./handlers/errorHandlers');
const erpApiRouter = require('./routes/appRoutes/appApi');
const erpApiWithTokenRouter = require('./routes/appRoutes/appApiWithToken');
const startCronJob = require('./cron/reminderCron'); // adjust path
const loginStartCronJob = require('./cron/loginReminderCron'); // adjust path

// create our Express app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(
  bodyParser.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    }
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(compression())


// Express session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback_secret_for_dev_only',
  resave: true,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    // sameSite: 'lax' // Consider adding sameSite attribute
  }
}));

// Here our API Routes
app.use('/api', coreAuthRouter);
app.use('/api', coreApiRouter);

// Common routes - erpApiRouter might be public or have its own auth
app.use('/api', erpApiRouter);

// Routes protected by adminAuth.isValidAuthToken
app.use('/api', adminAuth.isValidAuthToken, erpApiWithTokenRouter);

app.use("/public", express.static(path.join(__dirname, 'public')));
startCronJob();
loginStartCronJob();
// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);
// production error handler
app.use(errorHandlers.productionErrors);
// done! we export it so we can start the site in start.js
module.exports = app;
