require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

// Конфігурація схем моделей
const BlogSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String
  },
  bannerImage: {
    type: String,
  },
  type: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId
  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

const ContactusSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: String,
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

const FaqSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId
  }
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

const PageContentSchema = new mongoose.Schema({
  removed: {
    type: Boolean,
    default: false,
  },
  enabled: {
    type: Boolean,
    default: true,
  },
  title: {
    type: String,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  shortContent: {
    type: String
  },
  bannerImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.ObjectId
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId
  },
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' },
});

async function migrateData() {
  try {
    console.log('🚀 Початок міграції даних...');

    // Підключення до старої бази даних
    const oldConnection = mongoose.createConnection(process.env.OLD_DATABASE);
    console.log('✅ Підключено до старої бази даних');

    // Підключення до нової бази даних
    const newConnection = mongoose.createConnection(process.env.DATABASE);
    console.log('✅ Підключено до нової бази даних');

    // Створення моделей для старої БД
    const OldBlog = oldConnection.model('Blog', BlogSchema);
    const OldContactus = oldConnection.model('Contactus', ContactusSchema);
    const OldFaq = oldConnection.model('Faq', FaqSchema);
    const OldPageContent = oldConnection.model('PageContent', PageContentSchema);

    // Створення моделей для нової БД
    const NewBlog = newConnection.model('Blog', BlogSchema);
    const NewContactus = newConnection.model('Contactus', ContactusSchema);
    const NewFaq = newConnection.model('Faq', FaqSchema);
    const NewPageContent = newConnection.model('PageContent', PageContentSchema);

    // Міграція Blogs
    console.log('📝 Міграція блогів...');
    const blogs = await OldBlog.find({});
    console.log(`Знайдено ${blogs.length} блогів для міграції`);
    
    for (const blog of blogs) {
      const existingBlog = await NewBlog.findOne({ _id: blog._id });
      if (!existingBlog) {
        await NewBlog.create(blog.toObject());
        console.log(`✅ Мігровано блог: ${blog.title}`);
      } else {
        console.log(`⚠️ Блог вже існує: ${blog.title}`);
      }
    }

    // Міграція Contact Us
    console.log('📧 Міграція контактних форм...');
    const contacts = await OldContactus.find({});
    console.log(`Знайдено ${contacts.length} контактних форм для міграції`);
    
    for (const contact of contacts) {
      const existingContact = await NewContactus.findOne({ _id: contact._id });
      if (!existingContact) {
        await NewContactus.create(contact.toObject());
        console.log(`✅ Мігровано контакт: ${contact.name} - ${contact.email}`);
      } else {
        console.log(`⚠️ Контакт вже існує: ${contact.name} - ${contact.email}`);
      }
    }

    // Міграція FAQs
    console.log('❓ Міграція FAQ...');
    const faqs = await OldFaq.find({});
    console.log(`Знайдено ${faqs.length} FAQ для міграції`);
    
    for (const faq of faqs) {
      const existingFaq = await NewFaq.findOne({ _id: faq._id });
      if (!existingFaq) {
        await NewFaq.create(faq.toObject());
        console.log(`✅ Мігровано FAQ: ${faq.question.substring(0, 50)}...`);
      } else {
        console.log(`⚠️ FAQ вже існує: ${faq.question.substring(0, 50)}...`);
      }
    }

    // Міграція Page Contents
    console.log('📄 Міграція контенту сторінок...');
    const pageContents = await OldPageContent.find({});
    console.log(`Знайдено ${pageContents.length} контентів сторінок для міграції`);
    
    for (const pageContent of pageContents) {
      const existingPageContent = await NewPageContent.findOne({ _id: pageContent._id });
      if (!existingPageContent) {
        await NewPageContent.create(pageContent.toObject());
        console.log(`✅ Мігровано контент сторінки: ${pageContent.title} (${pageContent.page})`);
      } else {
        console.log(`⚠️ Контент сторінки вже існує: ${pageContent.title} (${pageContent.page})`);
      }
    }

    // Підрахунок результатів
    const newBlogCount = await NewBlog.countDocuments({});
    const newContactCount = await NewContactus.countDocuments({});
    const newFaqCount = await NewFaq.countDocuments({});
    const newPageContentCount = await NewPageContent.countDocuments({});

    console.log('\n🎉 Міграція завершена успішно!');
    console.log('📊 Результати:');
    console.log(`   - Блоги: ${newBlogCount}`);
    console.log(`   - Контакти: ${newContactCount}`);
    console.log(`   - FAQ: ${newFaqCount}`);
    console.log(`   - Контент сторінок: ${newPageContentCount}`);

    // Закриття з'єднань
    await oldConnection.close();
    await newConnection.close();
    
    console.log('✅ З\'єднання з базами даних закрито');
    console.log('🏁 Скрипт міграції завершено');
    
    process.exit(0);

  } catch (error) {
    console.error('❌ Помилка під час міграції:', error);
    process.exit(1);
  }
}

// Запуск міграції
migrateData(); 