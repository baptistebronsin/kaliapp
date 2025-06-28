"use client";

import { Brain, ChevronRight, LucideIcon, Menu, Settings, Target, User, X } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";

interface NavProps {
    title: string
    links: {
        icon: LucideIcon;
        title: string;
        description: string;
        color: string;
        redirection: string;
    }[]
}

const Navigation: React.FC<NavProps> = ({ title, links }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <>
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Kaliapp
                        </h1>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {
                            links.map((item, index) => (
                                <Button key={index} asChild variant="ghost" className="text-gray-600 hover:text-blue-600">
                                    <Link href={item.redirection}>
                                        <item.icon className="w-4 h-4 mr-2" />
                                        {item.title}
                                    </Link>
                                </Button>
                            ))
                        }
                    </nav>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="sm"
                        className="md:hidden relative z-50"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle mobile menu"
                    >
                    <div className="relative w-6 h-6">
                        <Menu
                            className={`w-6 h-6 text-gray-600 absolute transition-all duration-300 ${
                                isMobileMenuOpen ? "rotate-90 opacity-0" : "rotate-0 opacity-100"
                            }`}
                        />
                        <X
                            className={`w-6 h-6 text-white absolute transition-all duration-300 ${
                                isMobileMenuOpen ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
                            }`}
                        />
                    </div>
                    </Button>
                </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${
                isMobileMenuOpen ? "visible" : "invisible"
                }`}
            >
                {/* Backdrop */}
                <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                        isMobileMenuOpen ? "opacity-100" : "opacity-0"
                    }`}
                    onClick={toggleMobileMenu}
                />

                {/* Menu Panel */}
                <div
                    className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-out ${
                        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                {/* Menu Header */}
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8">
                    <div className="flex items-center space-x-3 mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold text-lg">Utilisateur</h3>
                        <p className="text-blue-100 text-sm">contact@baptistebronsin.be</p>
                    </div>
                    </div>
                </div>

                {/* Menu Content */}
                <div className="px-6 py-6 flex-1 overflow-y-auto">
                    <div className="flex flex-col gap-2">
                        {links.map((item, index) => (
                            <Link key={index} href={item.redirection} onClick={() => setIsMobileMenuOpen(false)} className="w-full group">
                                <Card className="border-0 shadow-sm hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
                                    <CardContent className="p-4">
                                        <div className="flex items-center space-x-4">
                                            <div
                                            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center flex-shrink-0`}
                                            >
                                                <item.icon className="w-6 h-6 text-white" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-8 pt-6 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-900 mb-4">Actions rapides</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                className="h-auto p-4 flex-col space-y-2 bg-transparent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                            <Target className="w-5 h-5 text-blue-600" />
                            <span className="text-xs">Quiz rapide</span>
                            </Button>
                            <Button
                                variant="outline"
                                className="h-auto p-4 flex-col space-y-2 bg-transparent"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                            <Settings className="w-5 h-5 text-gray-600" />
                            <span className="text-xs">Paramètres</span>
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Menu Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-center space-x-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <Brain className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-gray-900">Kaliapp</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-1">Version 1.0.0</p>
                </div>
                </div>
            </div>
        </>
    )
}

export default Navigation