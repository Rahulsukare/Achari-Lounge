import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
const ChatbotComponent = () => {
    'use strict';
    const theme = {
        background: '#f5f8fb',
        fontFamily: 'Helvetica Neue',
        headerBgColor: '#00813d',
        headerFontColor: '#fff',
        headerFontSize: '15px',
        botBubbleColor: '#00813d',
        botFontColor: '#fff',
        userBubbleColor: '#fff',
        userFontColor: '#4a4a4a',
        };
    const steps = [
        {
            id: '1',
            message: 'Welcome to our restaurant! How can I assist you today?',
            trigger: '2',
        },
        {
            id: '2',
            options: [
                { value: 1, label: 'Menu', trigger: 'menu' },
                { value: 2, label: 'Reservation', trigger: 'reservation' },
                { value: 3, label: 'Opening hours', trigger: 'opening_hours' },
                { value: 4, label: 'Contact', trigger: 'contact' },
            ],
        },
        {
            id: 'menu',
            message: 'Our menu includes various dishes. What type of cuisine are you interested in?',
            trigger: 'cuisine',
        },
        {
            id: 'cuisine',
            user: true, 
            trigger: 'cuisine_confirmation',
        },
        {
            id: 'cuisine_confirmation',
            message: 'Okay, we will contact you shortly.',
            trigger: '2', 
        },
        {
            id: 'reservation',
            message: 'Would you like to make a reservation?',
            trigger: 'reservation_options',
        },
        {
            id: 'reservation_options',
            options: [
                { value: 1, label: 'Yes', trigger: 'reservation_yes' },
                { value: 2, label: 'No', trigger: '2' }, 
            ],
        },
        {
            id: 'reservation_yes',
            message: 'Please provide details for your reservation.',
            trigger: '2', 
        },
        {
            id: 'opening_hours',
            message: 'Our opening hours are from 10:00 AM to 10:00 PM, Monday to Sunday.',
            trigger: '2',
        },
        {
            id: 'contact',
            message: 'You can contact us at example@example.com or +123456789.',
            trigger: '2',
        },
    ];

    return (
        <div> 
            <ThemeProvider theme={theme}>
            <ChatBot
                steps={steps}
                width="300px"
                recognitionEnable={true}
                headerTitle="Restaurant Chatbot"
                botAvatar="https://via.placeholder.com/30"
                userAvatar="https://via.placeholder.com/30"
                floating={true}
                />
                </ThemeProvider>
        </div>
    );
};

export default ChatbotComponent;
