import emailjs from '@emailjs/browser';

// Initialize EmailJS with your public key
emailjs.init('B6EzNeSIjQOTyWOLO');

interface OrderEmailData {
  id: string;
  name: string;
  phoneNumber: string;
  address: string;
  items: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  total: number;
  deliveryCost?: number;
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
    // Format items for email in a more readable HTML format
    const itemsHtml = orderData.items.map(item => 
      `<tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.price.toFixed(2)} د.ل</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${(item.price * item.quantity).toFixed(2)} د.ل</td>
      </tr>`
    ).join('');
    
    // Prepare template parameters with enhanced formatting
    const templateParams = {
      order_id: orderData.id,
      customer_name: orderData.name,
      customer_phone: orderData.phoneNumber,
      customer_address: orderData.address,
      order_items_html: itemsHtml,
      order_items_text: orderData.items.map(item => 
        `${item.name} (${item.quantity}x) - ${item.price} د.ل`
      ).join('\n'),
      order_subtotal: orderData.total.toFixed(2),
      order_delivery_cost: orderData.deliveryCost ? orderData.deliveryCost.toFixed(2) : '0.00',
      order_total: orderData.deliveryCost 
        ? (orderData.total + orderData.deliveryCost).toFixed(2) 
        : orderData.total.toFixed(2),
      order_date: new Date().toLocaleDateString('ar-LY'),
      order_time: new Date().toLocaleTimeString('ar-LY'),
      customer_notes: orderData.notes || 'لا توجد ملاحظات',
      items_count: orderData.items.reduce((sum, item) => sum + item.quantity, 0),
      email_subject: `طلب جديد #${orderData.id} - ${orderData.name}`,
      email_preview: `طلب جديد من ${orderData.name} بقيمة ${orderData.total.toFixed(2)} د.ل`
    };
    
    // Send email using EmailJS
    await emailjs.send(
      'itzhapy@gmail.com', // Service ID
      'template_f5rh7n9', // Template ID
      templateParams
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
