"use client";

import { motion } from 'framer-motion';
import { Droplets, Target, Eye, Heart, Sparkles, TrendingDown, Users, Sprout, Factory, AlertCircle, Zap, Linkedin, Twitter, Mail, Lightbulb, Rocket, Award, TrendingUp as TrendingUpIcon, Building2, GraduationCap, Landmark, Handshake } from 'lucide-react';
import Header from '@/components/Header';
import WavyDivider from '@/components/WavyDivider';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';
import Image from 'next/image';

// AboutHero Component (integrated)
function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-shakespeare-300 via-shakespeare-700 to-shakespeare-950 pt-15 ">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1600"
          alt="Indian river"
          className="w-full h-full object-cover opacity-99"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-shakespeare-200/80 via-shakespeare-900/90 to-shakespeare-950 opacity-80"></div>
      </div>

      {/* Animated Water Ripples */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-96 h-96 border-2 border-shakespeare-400 rounded-full"
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 2 + i * 0.5, opacity: 0 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut"
            }}
            style={{
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-aqua-teal rounded-full"
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
          }}
          style={{
            left: `${5 + i * 6}%`,
            top: '90%',
          }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-32 pt-40">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          {/* <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-shakespeare-950 to-shakespeare-700 mb-8 shadow-2xl opacity-40"
          > */}
            {/* <Droplets className="w-12 h-12 text-white" /> */}
            {/* <Image 
      src="/logo.png"   // file in public folder
      alt="Water tank"
      width={400}
      height={300}
      className="rounded-lg"
    /> */}
          {/* </motion.div> */}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Redefining Water
            <br />
            <span className="text-gradient bg-gradient-to-r from-aqua-teal via-shakespeare-300 to-shakespeare-400 bg-clip-text text-transparent">
              Management for India
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-shakespeare-200 mb-12 leading-relaxed"
          >
            Born from innovation, driven by purpose. AquaSense is transforming how India manages its most precious resource through AI, IoT, and data intelligence.
          </motion.p>

          {/* Mission & Vision Pills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <div className="flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <Target className="w-6 h-6 text-aqua-teal" />
              <span className="text-white font-semibold">Mission Driven</span>
            </div>
            <div className="flex items-center space-x-3 px-8 py-4 bg-white/10 backdrop-blur-lg rounded-full border border-white/20">
              <Eye className="w-6 h-6 text-shakespeare-300" />
              <span className="text-white font-semibold">Future Focused</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

// MissionVision Component (integrated)
function MissionVision() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-shakespeare-50 to-white overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-shakespeare-100 text-shakespeare-700 rounded-full font-semibold text-sm mb-4">
            Our Purpose
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shakespeare-950 mb-6">
            Mission & <span className="text-gradient">Vision</span>
          </h2>
        </motion.div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {/* Mission Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-shakespeare-600 to-shakespeare-800 rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-aqua-teal rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <div className="relative">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Target className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-4xl font-bold text-white mb-6">Our Mission</h3>
                <p className="text-2xl text-shakespeare-100 font-medium mb-6 leading-relaxed">
                  "Maximizing India's water reuse through AI-powered intelligence"
                </p>
                <p className="text-shakespeare-200 text-lg leading-relaxed">
                  We're on a mission to make every drop count. By combining artificial intelligence, IoT sensors, and real-time analytics, we help organizations across India optimize water usage, reduce waste, and build sustainable water management systems that protect our future.
                </p>

                {/* Decorative Elements */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ y: -10 }}
            className="group"
          >
            <div className="relative h-full bg-gradient-to-br from-aqua-teal to-shakespeare-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-shakespeare-400 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              </div>

              <div className="relative">
                {/* Icon */}
                <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  <Eye className="w-10 h-10 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-4xl font-bold text-white mb-6">Our Vision</h3>
                <p className="text-2xl text-white font-medium mb-6 leading-relaxed">
                  "A future where every drop is valued, monitored, and reused"
                </p>
                <p className="text-shakespeare-100 text-lg leading-relaxed">
                  We envision an India where water scarcity is no longer a concern. Where smart technology ensures that every liter of water is used efficiently, every drop is accounted for, and sustainable water practices become the norm across agriculture, industry, and communities.
                </p>

                {/* Decorative Elements */}
                <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/5 rounded-full"></div>
                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-shakespeare-950 text-center mb-12">
            Our Core Values
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Sustainability First',
                description: 'Every decision we make is guided by environmental impact and long-term sustainability.',
                color: 'shakespeare-500',
              },
              {
                icon: Sparkles,
                title: 'Innovation Driven',
                description: 'We leverage cutting-edge technology to solve complex water management challenges.',
                color: 'aqua-teal',
              },
              {
                icon: Target,
                title: 'Impact Focused',
                description: 'We measure success by the real-world impact we create for communities and industries.',
                color: 'orange-accent',
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-shakespeare-100 hover:shadow-xl transition-all"
              >
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--color-${value.color}) 0%, var(--color-shakespeare-700) 100%)`
                  }}
                >
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-xl font-bold text-shakespeare-900 mb-3">
                  {value.title}
                </h4>
                <p className="text-shakespeare-700 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20"
        >
          <div className="bg-gradient-to-r from-shakespeare-800 via-shakespeare-700 to-shakespeare-800 rounded-3xl p-12 text-white shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: '2023', label: 'Founded' },
                { value: '50+', label: 'Team Members' },
                { value: '500+', label: 'Deployments' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-5xl font-bold text-aqua-teal mb-2">{stat.value}</div>
                  <div className="text-shakespeare-200 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// WhyIndiaSection Component (integrated)
function WhyIndiaSection() {
  const challenges = [
    {
      icon: TrendingDown,
      title: 'Water Scarcity Crisis',
      description: '600 million people face high to extreme water stress across India.',
      stat: '600M',
      color: 'shakespeare-500',
    },
    {
      icon: AlertCircle,
      title: 'Groundwater Depletion',
      description: 'India is the world\'s largest groundwater user, depleting aquifers faster than replenishment.',
      stat: '24%',
      color: 'orange-accent',
    },
    {
      icon: Factory,
      title: 'Industrial Waste',
      description: 'Millions of liters of industrial wastewater discharged daily without proper treatment.',
      stat: '70%',
      color: 'royal-blue',
    },
    {
      icon: Sprout,
      title: 'Agricultural Demand',
      description: 'Agriculture consumes 80% of water resources, with significant wastage in traditional irrigation.',
      stat: '80%',
      color: 'aqua-teal',
    },
  ];

  const solutions = [
    {
      title: 'Government Initiatives',
      points: [
        'Jal Shakti Abhiyan',
        'National Water Mission',
        'Atal Bhujal Yojana',
        'Namami Gange Programme',
      ],
    },
    {
      title: 'Technology Adoption',
      points: [
        'Smart water metering',
        'IoT sensor networks',
        'AI-powered analytics',
        'Real-time monitoring',
      ],
    },
    {
      title: 'Reuse Potential',
      points: [
        'Industrial water recycling',
        'Agricultural runoff recovery',
        'Municipal wastewater treatment',
        'Rainwater harvesting',
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-shakespeare-50 to-shakespeare-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-shakespeare-200 text-shakespeare-800 rounded-full font-semibold text-sm mb-4">
            The Indian Context
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shakespeare-950 mb-6">
            Why <span className="text-gradient">India Needs</span> AquaSense
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            India faces unique water challenges that demand innovative, scalable solutions. AquaSense is purpose-built for the Indian context.
          </p>
        </motion.div>

        {/* Challenges Grid */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-shakespeare-950 text-center mb-12"
          >
            The Challenge
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <div className="relative h-full bg-white rounded-2xl p-8 shadow-lg border border-shakespeare-100 hover:shadow-2xl transition-all overflow-hidden">
                  {/* Gradient Background */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${challenge.color}) 0%, var(--color-shakespeare-700) 100%)`
                    }}
                  ></div>

                  {/* Icon */}
                  <div 
                    className="relative w-16 h-16 rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${challenge.color}) 0%, var(--color-shakespeare-700) 100%)`
                    }}
                  >
                    <challenge.icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Stat */}
                  <div className="text-4xl font-bold text-shakespeare-900 mb-3">
                    {challenge.stat}
                  </div>

                  {/* Title */}
                  <h4 className="text-xl font-bold text-shakespeare-900 mb-3">
                    {challenge.title}
                  </h4>

                  {/* Description */}
                  <p className="text-shakespeare-700 leading-relaxed">
                    {challenge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* India Map Visual */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="relative bg-gradient-to-br from-shakespeare-800 to-shakespeare-900 rounded-3xl p-12 text-white shadow-2xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, var(--color-shakespeare-400) 1px, transparent 1px)',
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <h3 className="text-4xl font-bold mb-6">
                  Nationwide Impact
                </h3>
                <p className="text-xl text-shakespeare-200 mb-8 leading-relaxed">
                  AquaSense is deployed across 28 states, helping organizations from Kashmir to Kanyakumari manage their water resources intelligently.
                </p>

                <div className="space-y-4">
                  {[
                    { label: 'States Covered', value: '28/28' },
                    { label: 'Cities Deployed', value: '150+' },
                    { label: 'Rural Projects', value: '200+' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-shakespeare-700">
                      <span className="text-shakespeare-200">{item.label}</span>
                      <span className="text-2xl font-bold text-aqua-teal">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Visual */}
              <div className="relative">
                <div className="aspect-square bg-shakespeare-700/30 rounded-2xl border border-shakespeare-600 p-8 flex items-center justify-center">
                  <Users className="w-32 h-32 text-aqua-teal opacity-50" />
                </div>
                {/* Decorative dots */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-aqua-teal rounded-full"
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3,
                    }}
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-shakespeare-950 text-center mb-12">
            Our Approach to the Solution
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-shakespeare-100 hover:shadow-xl transition-all"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <Zap className="w-8 h-8 text-shakespeare-600" />
                  <h4 className="text-2xl font-bold text-shakespeare-900">
                    {solution.title}
                  </h4>
                </div>

                <ul className="space-y-3">
                  {solution.points.map((point, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 rounded-full bg-shakespeare-500"></div>
                      <span className="text-shakespeare-700">{point}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* SIH Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-orange-accent to-shakespeare-600 rounded-2xl px-12 py-8 shadow-xl">
            <p className="text-white text-lg mb-2">Proud Participant of</p>
            <h4 className="text-4xl font-bold text-white mb-2">🇮🇳 Smart India Hackathon 2024</h4>
            <p className="text-shakespeare-100">Building solutions for India's tomorrow</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// TeamSection Component (integrated)
function TeamSection() {
  const teamMembers = [
    {
      name: 'Arjun Sharma',
      role: 'ML Engineer',
      description: 'Specializes in predictive analytics and neural networks for water demand forecasting.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'arjun@aquasense.in',
      },
    },
    {
      name: 'Priya Patel',
      role: 'UI/UX Lead',
      description: 'Designs intuitive interfaces that make complex water data accessible to everyone.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'priya@aquasense.in',
      },
    },
    {
      name: 'Rahul Verma',
      role: 'IoT Lead',
      description: 'Expert in sensor networks and hardware integration for real-time monitoring.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'rahul@aquasense.in',
      },
    },
    {
      name: 'Sneha Reddy',
      role: 'Backend Engineer',
      description: 'Builds scalable cloud infrastructure and APIs that power AquaSense platform.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'sneha@aquasense.in',
      },
    },
    {
      name: 'Vikram Singh',
      role: 'LLM Agent Engineer',
      description: 'Develops intelligent AI agents for autonomous water system optimization.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'vikram@aquasense.in',
      },
    },
    {
      name: 'Ananya Kumar',
      role: 'Data Engineer',
      description: 'Manages data pipelines and analytics infrastructure for millions of sensor readings.',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      social: {
        linkedin: '#',
        twitter: '#',
        email: 'ananya@aquasense.in',
      },
    },
  ];

  return (
    <section id="team" className="relative py-24 bg-gradient-to-b from-shakespeare-100 via-white to-shakespeare-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-shakespeare-100 text-shakespeare-700 rounded-full font-semibold text-sm mb-4">
            Meet the Team
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shakespeare-950 mb-6">
            The Minds Behind <span className="text-gradient">AquaSense</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            A passionate team of engineers, designers, and innovators dedicated to solving India's water challenges
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group"
            >
              <div className="relative h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-shakespeare-100 hover:shadow-2xl transition-all duration-300">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-shakespeare-900 via-shakespeare-900/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  
                  {/* Social Links (appears on hover) */}
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <motion.a
                      whileHover={{ scale: 1.2, y: -3 }}
                      href={member.social.linkedin}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-shakespeare-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, y: -3 }}
                      href={member.social.twitter}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-shakespeare-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Twitter className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ scale: 1.2, y: -3 }}
                      href={`mailto:${member.social.email}`}
                      className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-shakespeare-500 hover:text-white transition-colors shadow-lg"
                    >
                      <Mail className="w-5 h-5" />
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-shakespeare-900 mb-2 group-hover:text-shakespeare-600 transition-colors">
                    {member.name}
                  </h3>
                  <div className="inline-block px-3 py-1 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white text-sm font-semibold rounded-full mb-4">
                    {member.role}
                  </div>
                  <p className="text-shakespeare-700 leading-relaxed">
                    {member.description}
                  </p>
                </div>

                {/* Decorative Border Glow */}
                <div className="absolute inset-0 border-4 border-shakespeare-400 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity pointer-events-none"></div>
                
                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-shakespeare-400 to-transparent opacity-0 group-hover:opacity-20 transition-opacity rounded-bl-full"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Join Team CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="inline-block bg-gradient-to-br from-shakespeare-800 to-shakespeare-900 rounded-2xl p-12 shadow-2xl text-white">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Want to Join Our Team?
            </h3>
            <p className="text-xl text-shakespeare-200 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals who are passionate about solving India's water challenges
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-shakespeare-800 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              View Open Positions
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// JourneyTimeline Component (integrated)
function JourneyTimeline() {
  const milestones = [
    {
      year: '2023',
      quarter: 'Q1',
      title: 'The Idea',
      description: 'AquaSense was born from a simple observation: India wastes millions of liters of water daily while facing severe scarcity.',
      icon: Lightbulb,
      color: 'shakespeare-500',
      achievements: [
        'Team formation',
        'Market research',
        'Problem validation',
      ],
    },
    {
      year: '2023',
      quarter: 'Q2',
      title: 'SIH Qualification',
      description: 'Selected for Smart India Hackathon 2024, validating our vision and approach to solving India\'s water challenges.',
      icon: Award,
      color: 'orange-accent',
      achievements: [
        'SIH selection',
        'Mentor network',
        'Initial funding',
      ],
    },
    {
      year: '2023',
      quarter: 'Q3',
      title: 'Prototype Development',
      description: 'Built MVP with IoT sensors, cloud infrastructure, and ML models. First successful tests in controlled environment.',
      icon: Rocket,
      color: 'aqua-teal',
      achievements: [
        'MVP launch',
        'IoT integration',
        'AI model training',
      ],
    },
    {
      year: '2023',
      quarter: 'Q4',
      title: 'Pilot Deployments',
      description: 'Deployed systems in 5 pilot locations across Maharashtra and Gujarat, gathering real-world data and feedback.',
      icon: Target,
      color: 'royal-blue',
      achievements: [
        '5 pilot sites',
        '10K+ sensors',
        'Real data collection',
      ],
    },
    {
      year: '2024',
      quarter: 'Q1',
      title: 'Scale & Growth',
      description: 'Expanded to 150+ locations nationwide. Partnerships with major industries and agricultural cooperatives.',
      icon: TrendingUpIcon,
      color: 'shakespeare-600',
      achievements: [
        '150+ deployments',
        'Industry partnerships',
        'Team expansion',
      ],
    },
    {
      year: '2024',
      quarter: 'Q2',
      title: 'Future Vision',
      description: 'Aiming for 1000+ installations by year end. Expanding AI capabilities and launching mobile app.',
      icon: Sparkles,
      color: 'shakespeare-700',
      achievements: [
        '1000+ target',
        'Mobile app',
        'Advanced AI',
      ],
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-shakespeare-50 to-shakespeare-100 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-shakespeare-200 text-shakespeare-800 rounded-full font-semibold text-sm mb-4">
            Our Journey
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shakespeare-950 mb-6">
            From Idea to <span className="text-gradient">Impact</span>
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            Every great innovation starts with a vision. Here's how AquaSense evolved from a concept to India's leading water intelligence platform.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-6xl mx-auto">
          {milestones.map((milestone, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="relative mb-16 last:mb-0"
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                {/* Content Card */}
                <div className="flex-1">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -5 }}
                    className="relative bg-white rounded-2xl p-8 shadow-xl border border-shakespeare-100 hover:shadow-2xl transition-all overflow-hidden"
                  >
                    {/* Gradient Background */}
                    <div 
                      className="absolute inset-0 opacity-0 hover:opacity-5 transition-opacity"
                      style={{
                        background: `linear-gradient(135deg, var(--color-${milestone.color}) 0%, var(--color-shakespeare-700) 100%)`
                      }}
                    ></div>

                    {/* Year Badge */}
                    <div className="flex items-center space-x-3 mb-4">
                      <span 
                        className="px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, var(--color-${milestone.color}) 0%, var(--color-shakespeare-700) 100%)`
                        }}
                      >
                        {milestone.year} {milestone.quarter}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-3xl font-bold text-shakespeare-900 mb-3">
                      {milestone.title}
                    </h3>

                    {/* Description */}
                    <p className="text-shakespeare-700 text-lg leading-relaxed mb-6">
                      {milestone.description}
                    </p>

                    {/* Achievements */}
                    <div className="space-y-2">
                      {milestone.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ background: `var(--color-${milestone.color})` }}
                          ></div>
                          <span className="text-shakespeare-600 font-medium">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-transparent to-shakespeare-100 opacity-0 hover:opacity-100 transition-opacity rounded-tl-full"></div>
                  </motion.div>
                </div>

                {/* Icon Circle */}
                <div className="flex-shrink-0 relative">
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="relative w-32 h-32 rounded-full flex items-center justify-center shadow-2xl z-10"
                    style={{
                      background: `linear-gradient(135deg, var(--color-${milestone.color}) 0%, var(--color-shakespeare-700) 100%)`
                    }}
                  >
                    <milestone.icon className="w-16 h-16 text-white" />
                    
                    {/* Pulse Ring */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-20 animate-ping"
                      style={{ borderColor: `var(--color-${milestone.color})`, borderWidth: '4px' }}
                    ></div>
                  </motion.div>

                  {/* Connecting Line */}
                  {index < milestones.length - 1 && (
                    <div className="hidden md:block absolute top-32 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-shakespeare-400 to-transparent"></div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-br from-shakespeare-800 to-shakespeare-900 rounded-3xl p-12 shadow-2xl text-white">
            <Sparkles className="w-16 h-16 mx-auto mb-6 text-aqua-teal" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              This is Just the Beginning
            </h3>
            <p className="text-xl text-shakespeare-200 max-w-2xl mx-auto mb-8">
              Our journey continues as we work towards making water scarcity a thing of the past in India. Join us in this mission.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-shakespeare-800 font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all"
            >
              Be Part of Our Story
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// PartnersSection Component (integrated)
function PartnersSection() {
  const partnerCategories = [
    {
      title: 'Government Bodies',
      icon: Landmark,
      partners: [
        'Ministry of Jal Shakti',
        'NITI Aayog',
        'Central Water Commission',
        'National Water Mission',
      ],
    },
    {
      title: 'Academic Partners',
      icon: GraduationCap,
      partners: [
        'IIT Delhi',
        'IIT Bombay',
        'IISC Bangalore',
        'NIT Trichy',
      ],
    },
    {
      title: 'Industry Partners',
      icon: Building2,
      partners: [
        'Tata Group',
        'Reliance Industries',
        'Mahindra & Mahindra',
        'L&T Construction',
      ],
    },
    {
      title: 'Innovation Programs',
      icon: Award,
      partners: [
        'Smart India Hackathon',
        'Startup India',
        'Atal Innovation Mission',
        'MeitY',
      ],
    },
  ];

  const achievements = [
    {
      icon: Award,
      title: 'SIH 2024 Finalist',
      description: 'Selected among top innovations nationwide',
    },
    {
      icon: Users,
      title: 'Industry Recognition',
      description: 'Featured in leading tech publications',
    },
    {
      icon: Handshake,
      title: '50+ Partnerships',
      description: 'Collaborating with key stakeholders',
    },
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-shakespeare-100 via-white to-shakespeare-50 overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-shakespeare-400 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-aqua-teal rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-2 bg-shakespeare-100 text-shakespeare-700 rounded-full font-semibold text-sm mb-4">
            Collaborations
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-shakespeare-950 mb-6">
            Our <span className="text-gradient">Partners</span> & Supporters
          </h2>
          <p className="text-xl text-shakespeare-700 max-w-3xl mx-auto">
            Building the future of water management together with India's leading organizations
          </p>
        </motion.div>

        {/* Partner Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {partnerCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="h-full bg-white rounded-2xl p-8 shadow-lg border border-shakespeare-100 hover:shadow-2xl transition-all">
                {/* Icon */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-shakespeare-500 to-shakespeare-700 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                  <category.icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-shakespeare-900 mb-6">
                  {category.title}
                </h3>

                {/* Partners List */}
                <ul className="space-y-3">
                  {category.partners.map((partner, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-shakespeare-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-shakespeare-500"></div>
                      <span>{partner}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="bg-gradient-to-br from-shakespeare-800 to-shakespeare-900 rounded-3xl p-12 shadow-2xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'linear-gradient(var(--color-shakespeare-400) 1px, transparent 1px), linear-gradient(90deg, var(--color-shakespeare-400) 1px, transparent 1px)',
                backgroundSize: '50px 50px'
              }}></div>
            </div>

            <div className="relative">
              <h3 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                Recognition & Achievements
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className="text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-shakespeare-700/50 backdrop-blur-sm flex items-center justify-center mx-auto mb-4 border border-shakespeare-600">
                      <achievement.icon className="w-10 h-10 text-aqua-teal" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">
                      {achievement.title}
                    </h4>
                    <p className="text-shakespeare-300">
                      {achievement.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Logos Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-shakespeare-950 mb-8">
            Supported By
          </h3>
          
          <div className="flex flex-wrap justify-center items-center gap-6 mb-12">
            {[
              'Smart India Hackathon',
              'Startup India',
              'CSIR',
              'Ministry of Jal Shakti',
              'NITI Aayog',
              'Atal Innovation Mission',
              'IIT Consortium',
              'Water Technology Council',
            ].map((org, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -3 }}
                className="px-6 py-4 bg-white rounded-xl shadow-md border border-shakespeare-200 hover:shadow-lg transition-all"
              >
                <span className="text-shakespeare-800 font-semibold">
                  {org}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Partnership CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-shakespeare-50 rounded-2xl p-8 border border-shakespeare-200"
          >
            <h4 className="text-2xl font-bold text-shakespeare-900 mb-4">
              Interested in Partnership?
            </h4>
            <p className="text-shakespeare-700 mb-6 max-w-2xl mx-auto">
              We're always looking to collaborate with organizations that share our vision of sustainable water management
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-shakespeare-500 to-shakespeare-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              Get in Touch
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <AboutHero />
      
      <WavyDivider color="shakespeare-50" />
      
      <MissionVision />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-100" />
      
      <WhyIndiaSection />
      
      <WavyDivider color="shakespeare-100" />
      
      <TeamSection />
      
      <WavyDivider className="transform rotate-180" color="white" />
      
      <JourneyTimeline />
      
      <WavyDivider color="shakespeare-100" />
      
      <PartnersSection />
      
      <WavyDivider className="transform rotate-180" color="shakespeare-600" />
      
      <CallToAction />
      
      <Footer />
    </main>
  );
}