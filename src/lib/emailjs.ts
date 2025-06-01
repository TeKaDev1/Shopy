import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('B6EzNeSIjQOTyWOLO');

interface OrderEmailData {
  shop_name: string;
  shop_url: string;
  support_email: string;
  current_year: string;
  order_id: string; // Renamed from id for clarity in template
  customer_email: string; // Added for sending email to customer
  customer_name: string; // Renamed from name
  phone_number: string; // Renamed from phoneNumber
  delivery_address: string; // Renamed from address
  items_html: string; // Pre-formatted HTML for items
  subtotal_amount: string;
  delivery_fee: string;
  order_total: string; // Renamed from total
  currency: string;
  dashboard_link: string;
  items?: { // Made items optional as items_html is primary for template
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
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
    // items_html is now pre-formatted and passed in orderData
    
    // Prepare template parameters using the new OrderEmailData structure
    const templateParams = {
      shop_name: orderData.shop_name,
      shop_url: orderData.shop_url,
      support_email: orderData.support_email,
      current_year: orderData.current_year,
      order_id: orderData.order_id,
      customer_name: orderData.customer_name,
      phone_number: orderData.phone_number,
      delivery_address: orderData.delivery_address,
      items_html: orderData.items_html, // Use the pre-formatted HTML
      subtotal_amount: orderData.subtotal_amount,
      delivery_fee: orderData.delivery_fee,
      order_total: orderData.order_total,
      currency: orderData.currency,
      dashboard_link: orderData.dashboard_link,
      // --- Parameters specifically for the customer email template ---
      // The following are likely already covered by the direct mappings above
      // but ensure your EmailJS template 'template_se2cken' uses these variable names.
      // Example: {{customer_name}}, {{order_id}}, {{{items_html}}}, etc.

      // This parameter is crucial for EmailJS to know where to send the email
      // if your template's "To Email" field is set to a template variable like {{to_email}}
      to_email: orderData.customer_email,


      // --- Parameters that might still be useful for an admin notification (if you have one) ---
      // If 'template_f5rh7n9' was the admin template, you might send a different set of params to it.
      // For now, we are focusing on the customer email with 'template_se2cken'.
      // The following are illustrative if you were to also send an admin email.
      // admin_email_subject: `طلب جديد #${orderData.order_id} - ${orderData.customer_name}`,
      // admin_email_preview: `طلب جديد من ${orderData.customer_name} بقيمة ${orderData.currency} ${orderData.order_total}`,
      // admin_customer_phone: orderData.phone_number,
      // admin_customer_address: orderData.delivery_address,
      // admin_order_items_text: orderData.items.map(item =>
      //   `${item.name} (${item.quantity}x) - ${orderData.currency} ${item.price.toFixed(2)}`
      // ).join('\n'),
      // admin_order_date: new Date().toLocaleDateString('ar-LY'),
      // admin_order_time: new Date().toLocaleTimeString('ar-LY'),
      // admin_customer_notes: orderData.notes || 'لا توجد ملاحظات',
      // admin_items_count: orderData.items.reduce((sum, item) => sum + item.quantity, 0),
    };
    
    // Send email to CUSTOMER using the new template ID
    await emailjs.send(
      'itzhapy@gmail.com',    // Your EmailJS Service ID
      'template_se2cken',   // Customer Order Confirmation Template ID
      templateParams        // Parameters for the customer email
    );
    
    console.log('Order confirmation email sent successfully');
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
    // Prepare template parameters
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
    
    // Send email using EmailJS
    await emailjs.send(
      'itzhapy@gmail.com', // Service ID
      'template_newsletter', // Template ID
      templateParams
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
    // Prepare template parameters
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
      response_message: `مرحباً ${data.name}،\n\nشكراً لتواصلك معنا. لقد استلمنا رسالتك وسيقوم فريقنا بالرد عليك في أقرب وقت ممكن.\n\nتفاصيل رسالتك:\nالموضوع: ${data.subject}\nالرسالة: ${data.message}\n\nمع تحيات،\nفريق دخيل`
    };
    
    // Send email using EmailJS
    await emailjs.send(
      'itzhapy@gmail.com', // Service ID
      'template_contact', // Template ID
      templateParams
    );
    
    console.log('Contact form email sent successfully');
  } catch (error) {
    console.error('Error sending contact form email:', error);
    throw error;
  }
};
