import Image from "next/image";
import { Shield, Users, Award, Truck, Clock, Phone } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cyan-700 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              About ZedExel
            </h1>
            <p className="mt-6 text-xl text-cyan-100 max-w-3xl mx-auto">
              Your trusted partner in industrial safety and equipment solutions. 
              We're committed to protecting workers and enhancing workplace safety 
              through quality products and exceptional service.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                At ZedExel, we believe that every worker deserves the highest level of protection. 
                Our mission is to provide comprehensive safety solutions that meet the most demanding 
                industrial standards while ensuring accessibility and affordability.
              </p>
              <p className="text-lg text-gray-600">
                We partner with leading manufacturers to bring you the best in safety equipment, 
                from protective gear to advanced monitoring systems, all backed by our expert 
                knowledge and dedicated support.
              </p>
            </div>
            <div className="relative">
              <Image
                src="/banners/full.png"
                alt="Industrial Safety Equipment"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These principles guide everything we do and shape our relationships with customers, 
              partners, and the communities we serve.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Safety First</h3>
              <p className="text-gray-600">
                Every product we offer meets or exceeds industry safety standards. 
                We never compromise on quality when it comes to protecting lives.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">
                We understand the unique challenges of different industries and work 
                closely with our customers to provide tailored solutions.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality Assurance</h3>
              <p className="text-gray-600">
                Rigorous testing and quality control ensure that every product 
                meets our high standards for durability and performance.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Reliable Delivery</h3>
              <p className="text-gray-600">
                Fast, secure shipping ensures your safety equipment arrives when you need it, 
                with tracking and support throughout the process.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Support</h3>
              <p className="text-gray-600">
                Our expert team is always available to help with product selection, 
                technical support, and emergency orders.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-gray-50">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-600 text-white rounded-full mb-4">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Expert Consultation</h3>
              <p className="text-gray-600">
                Our safety specialists provide personalized guidance to help you 
                choose the right equipment for your specific needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Comprehensive Safety Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From head to toe protection, we offer a complete range of safety equipment 
              for every industry and application.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Head Protection</h3>
              <p className="text-sm text-gray-600">
                Safety helmets, hard hats, and welding helmets for maximum head protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Respiratory Protection</h3>
              <p className="text-sm text-gray-600">
                Respirators, masks, and breathing apparatus for clean air safety.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Hand Protection</h3>
              <p className="text-sm text-gray-600">
                Safety gloves for cut resistance, chemical protection, and heat resistance.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Eye & Face Protection</h3>
              <p className="text-sm text-gray-600">
                Safety glasses, goggles, and face shields for comprehensive eye protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Hearing Protection</h3>
              <p className="text-sm text-gray-600">
                Ear muffs, ear plugs, and noise-canceling solutions for hearing safety.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Foot Protection</h3>
              <p className="text-sm text-gray-600">
                Safety shoes and boots with steel toes, slip resistance, and electrical protection.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Body Protection</h3>
              <p className="text-sm text-gray-600">
                High-visibility clothing, flame-resistant gear, and protective coveralls.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">Fall Protection</h3>
              <p className="text-sm text-gray-600">
                Harnesses, lanyards, and anchor points for working at heights safely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We partner with the world's leading manufacturers to bring you the highest 
              quality safety equipment and protective gear.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="flex justify-center">
              <Image
                src="/logos/3M.png"
                alt="3M"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/logos/ge.png"
                alt="GE"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/logos/daikin.png"
                alt="Daikin"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/logos/amntum.png"
                alt="Amntum"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/logos/airwheel.png"
                alt="Airwheel"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="flex justify-center">
              <Image
                src="/vendors/honeywell.svg"
                alt="Honeywell"
                width={80}
                height={40}
                className="h-12 w-auto opacity-60 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-cyan-700 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Enhance Your Safety?
          </h2>
          <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
            Browse our comprehensive catalog of safety equipment and protective gear. 
            Our experts are here to help you find the perfect solutions for your workplace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-cyan-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Browse Products
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white hover:bg-cyan-600 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
