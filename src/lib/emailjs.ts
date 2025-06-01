import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('B6EzNeSIjQOTyWOLO');

interface OrderEmailData {
  shop_name: string;
  shop_url: string;
  support_email: string;
  current_year: string;
  order_id: string;
  customer_name: string;
  phone_number: string;
  delivery_address: string;
  items_html: string;
  subtotal_amount: string;
  delivery_fee: string;
  order_total: string;
  currency: string;
  dashboard_link: string;
  notes?: string;
}

interface NewsletterSubscriptionData {
  email: string;
  name?: string;
}

/**
 * Send order confirmation email to the store owner
 */
export const sendOrderConfirmationEmail = async (orderData: OrderEmailData): Promise<void> => {
  try {
    console.log('Preparing to send order confirmation email with data:', orderData);
    
    const templateParams = {
      shop_name: orderData.shop_name,
      shop_url: orderData.shop_url,
      support_email: orderData.support_email,
      current_year: orderData.current_year,
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      phone_number: orderData.phone_number,
      delivery_address: orderData.delivery_address,
      items_html: orderData.items_html,
      subtotal_amount: orderData.subtotal_amount,
      delivery_fee: orderData.delivery_fee,
      order_total: orderData.order_total,
      currency: orderData.currency,
      dashboard_link: orderData.dashboard_link,
      order_date: new Date().toLocaleDateString('ar-LY'),
      order_status: 'قيد الانتظار',
      customer_service_phone: '0922078595',
      to_email: 'itzhapy@gmail.com'
    };
    
    console.log('Sending email with template params:', templateParams);
    console.log('Using service ID: service_orn_1i7o');
    console.log('Using template ID: template_f5rh7n9');
    console.log('Using public key: B6EzNeSIjQOTyWOLO');
    
    // Send email using the correct service ID and template ID
    const response = await emailjs.send(
      'itzhapy@gmail.com',
      'template_se2cken',
      templateParams,
      'B6EzNeSIjQOTyWOLO'
    );
    
    console.log('Email sent successfully:', response);
  } catch (error) {
    console.error('Error sending order confirmation email:', error);
    throw error;
  }
};

/**
 * Send newsletter subscription confirmation
 */
export const sendNewsletterSubscription = async (data: NewsletterSubscriptionData): Promise<void> => {
  try {
    const templateParams = {
      subscriber_email: data.email,
      subscriber_name: data.name || 'مشترك جديد',
      subscription_date: new Date().toLocaleDateString('ar-LY'),
      subscription_time: new Date().toLocaleTimeString('ar-LY'),
      to_email: 'itzhapy@gmail.com',
      email_subject: 'اشتراك جديد في النشرة الإخبارية',
      email_preview: `اشتراك جديد من ${data.email}`,
      welcome_message: `مرحباً ${data.name || 'عزيزي المشترك'}،\n\nنشكرك على اشتراكك في نشرتنا الإخبارية! ستصلك آخر التحديثات والعروض الخاصة مباشرة إلى بريدك الإلكتروني.\n\nمع تحيات،\nفريق دخيل`
    };
    
    await emailjs.send(
      'itzhapy@gmail.com',
      'template_newsletter',
      templateParams,
      'B6EzNeSIjQOTyWOLO'
    );
    
    console.log('Newsletter subscription email sent successfully');
  } catch (error) {
    console.error('Error sending newsletter subscription email:', error);
    throw error;
  }
};

/**
 * Send contact form submission
 */
export const sendContactFormEmail = async (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
  phone?: string;
}): Promise<void> => {
  try {
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      from_phone: data.phone || 'غير متوفر',
      subject: data.subject,
      message: data.message,
      submission_date: new Date().toLocaleDateString('ar-LY'),
      submission_time: new Date().toLocaleTimeString('ar-LY'),
      email_subject: `رسالة جديدة: ${data.subject}`,
      email_preview: `رسالة جديدة من ${data.name} بخصوص ${data.subject}`,
      response_message: `مرحباً ${data.name}،\n\nشكراً لتواصلك معنا. لقد استلمنا رسالتك وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.\n\nتفاصيل رسالتك:\nالموضوع: ${data.subject}\nالرسالة: ${data.message}\n\nمع تحيات،\nفريق دخيل`,
      to_email: 'itzhapy@gmail.com'
    };
    
    await emailjs.send(
      'itzhapy@gmail.com',
      'template_contact',
      templateParams,
      'B6EzNeSIjQOTyWOLO'
    );
    
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};
