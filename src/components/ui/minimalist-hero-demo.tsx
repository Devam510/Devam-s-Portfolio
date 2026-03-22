import React from 'react';
import { Linkedin, Instagram, Twitter, Github } from 'lucide-react';
import { MinimalistHero } from '@/components/ui/minimalist-hero';

const MinimalistHeroDemo = () => {
  const navLinks = [
    { label: 'HOME', href: '#' },
    { label: 'ABOUT', href: '#about' },
    { label: 'PROJECTS', href: '#projects' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/in/patel-devam-596535312' },
    { icon: Instagram, href: 'https://www.instagram.com/devam__.1510' },
    { icon: Github,   href: 'https://github.com/Devam510' },
    { icon: Twitter,  href: '#' },
  ];

  return (
    <div id="about">
      <MinimalistHero
        navLinks={navLinks}
        readMoreLink="#about"
        imageSrc="/devam.png"
        overlayText={{
          part1: 'Devam',
          part2: 'Patel',
        }}
        socialLinks={socialLinks}
      />
    </div>
  );
};

export default MinimalistHeroDemo;
