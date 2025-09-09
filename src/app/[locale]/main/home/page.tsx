'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

// Định nghĩa props cho từng chủ đề
interface TopicContent {
    title: string;
    description: string;
    image: string;
    emoji: string;
}

const topicData: Record<string, TopicContent> = {
    gi: {
        title: 'Genshin Impact',
        description: 'Khám phá thế giới Teyvat rộng lớn với những nhân vật đầy màu sắc!',
        image: '/paimon_emoji.png',
        emoji: '✨'
    },
    hsr: {
        title: 'Honkai: Star Rail',
        description: 'Bước lên đoàn tàu Astral Express và du hành qua các thiên hà!',
        image: '/m7_emoji.png',
        emoji: '🚀'
    }
};

const HomePageContent = () => {
    // Lấy tham số truy vấn từ URL
    const searchParams = useSearchParams();
    const topic = searchParams.get('topic') || 'gi'; // Mặc định là 'gi' nếu không có tham số
    const currentTopic = topicData[topic];

    // Sử dụng state để kiểm soát nội dung
    const [content, setContent] = useState<TopicContent | null>(null);

    useEffect(() => {
        if (currentTopic) {
            setContent(currentTopic);
        }
    }, [topic, currentTopic]);

    if (!content) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
                <h1 className="text-2xl font-bold">Không tìm thấy nội dung</h1>
                <p className="mt-2 text-md">Vui lòng quay lại trang chủ và chọn một chủ đề hợp lệ.</p>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-white">
            <div className="text-center p-8 bg-gray-800 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105">
                <Image
                    src={content.image}
                    alt={content.title}
                    width={250}
                    height={250}
                    className="rounded-xl mx-auto mb-6"
                />
                <h1 className="text-5xl font-extrabold mb-4">{content.title} {content.emoji}</h1>
                <p className="text-lg font-medium max-w-lg mx-auto leading-relaxed">{content.description}</p>
            </div>
        </div>
    );
};

export default function HomePage() {
    return <HomePageContent />;
}