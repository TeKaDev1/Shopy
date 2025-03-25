import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Award, Heart, Clock, ShieldCheck, Truck } from 'lucide-react';

const About = () => {
  return (
    <div className="bg-background pt-16">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-70"></div>
        
        <div className="relative container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">من نحن</h1>
            <p className="text-lg text-foreground/80 mb-8">
              نحن متجر إلكتروني متخصص في توفير منتجات عالية الجودة بأسعار مناسبة، مع التركيز على تجربة تسوق سلسة وخدمة عملاء متميزة.
            </p>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl font-bold mb-6">قصتنا</h2>
              <p className="text-foreground/80 mb-4">
                بدأت رحلتنا في عام 2020 بهدف بسيط: توفير منتجات عالية الجودة للعملاء في ليبيا بأسعار معقولة وخدمة توصيل موثوقة.
              </p>
              <p className="text-foreground/80 mb-4">
                مع مرور الوقت، نمت شبكتنا وتوسعت مجموعة منتجاتنا، لكن التزامنا بالجودة والخدمة الممتازة ظل ثابتًا. نحن نؤمن بأن كل عميل يستحق تجربة تسوق استثنائية.
              </p>
              <p className="text-foreground/80 mb-6">
                اليوم، نفخر بخدمة آلاف العملاء في جميع أنحاء ليبيا، ونواصل السعي لتحسين خدماتنا وتوسيع نطاق منتجاتنا لتلبية احتياجات عملائنا المتنوعة.
              </p>
              <Link 
                to="/products" 
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                تصفح منتجاتنا
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <div className="absolute -top-4 -right-4 w-full h-full bg-primary/10 rounded-xl transform rotate-3"></div>
                <img 
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                  alt="فريق العمل" 
                  className="relative z-10 rounded-xl shadow-lg w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-12 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">قيمنا</h2>
            <p className="text-foreground/80">
              نحن نؤمن بأن النجاح يأتي من خلال الالتزام بمجموعة من القيم الأساسية التي توجه كل ما نقوم به.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">التركيز على العميل</h3>
              <p className="text-foreground/70">
                نضع عملاءنا في قلب كل ما نقوم به، ونسعى جاهدين لتجاوز توقعاتهم في كل مرة.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الجودة</h3>
              <p className="text-foreground/70">
                نلتزم بتقديم منتجات عالية الجودة تدوم طويلاً وتقدم قيمة حقيقية لعملائنا.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الشغف</h3>
              <p className="text-foreground/70">
                نحن متحمسون لما نقوم به ونسعى باستمرار للابتكار وتحسين خدماتنا ومنتجاتنا.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">النزاهة</h3>
              <p className="text-foreground/70">
                نؤمن بالصدق والشفافية في جميع تعاملاتنا، سواء مع العملاء أو الموردين أو بين أفراد فريقنا.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الالتزام</h3>
              <p className="text-foreground/70">
                نلتزم بمواعيد التسليم ونحترم وقت عملائنا، مع السعي دائمًا لتقديم خدمة سريعة وفعالة.
              </p>
            </div>
            
            <div className="bg-background rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Truck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">الموثوقية</h3>
              <p className="text-foreground/70">
                يمكن لعملائنا الاعتماد علينا لتقديم ما نعد به، سواء من حيث جودة المنتج أو خدمة التوصيل أو خدمة ما بعد البيع.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">انضم إلى آلاف العملاء السعداء</h2>
            <p className="text-lg text-foreground/80 mb-8">
              نحن نتطلع إلى خدمتك وتقديم تجربة تسوق استثنائية تجعلك تعود إلينا مرارًا وتكرارًا.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
              >
                تسوق الآن
              </Link>
              <Link
                to="/contact"
                className="bg-secondary text-foreground px-8 py-3 rounded-full font-medium hover:bg-secondary/80 transition-colors"
              >
                تواصل معنا
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;