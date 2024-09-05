import React, { useState, useEffect } from 'react';
import { Star, ShoppingCart, Heart } from 'lucide-react';

const ProductPage = () => {
  const [liked, setLiked] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/review.csv');
        const csvData = await response.text();
        const parsedReviews = csvData
          .split('\n')
          .slice(1) // Skip header row
          .filter(line => line.trim() !== '') // Exclude empty lines
          .map(line => {
            const [rating, author, comment, age] = line.split(',').map(item => item.trim());
            return { rating: parseInt(rating), author, comment, age: parseInt(age) };
          });
        setReviews(parsedReviews);
      } catch (error) {
        console.error('Error occurred while loading reviews:', error);
        setReviews([]); // Set empty array on error
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="max-w-md mx-auto bg-gradient-to-b from-purple-100 to-pink-100 min-h-screen">
      <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 flex justify-between items-center sticky top-0 z-10">
        <h1 className="text-xl font-bold italic">おしゃれ Mart</h1>
        <ShoppingCart className="animate-bounce" />
      </header>
      
      <main className="p-4">
        <div className="relative mb-4">
          <img src="/product.jpg" alt="Product Image" className="w-full rounded-lg shadow-lg" />
          <button 
            className={`absolute top-2 right-2 p-2 rounded-full ${liked ? 'bg-red-500' : 'bg-white'} transition-colors duration-300`}
            onClick={() => setLiked(!liked)}
          >
            <Heart fill={liked ? 'white' : 'none'} color={liked ? 'white' : 'red'} />
          </button>
        </div>
        
        <h2 className="text-2xl font-bold mb-2 text-purple-800">手帳型スマホケース</h2>
        <p className="text-gray-700 mb-4 whitespace-pre-line">
          {`高品質なPUレザーとTPU素材:
          ケース以外革部分はPUレザーで作られ、見た目も、滑り止め性能も触り心地も優れています。

          内部柔軟なTPUケースは、本革の表面と組み合わせ、衝撃吸収機能あり、携帯に全面保護を提供します。

          角度調整可能なハンズフリースタンドがあるので、スマホは横にスタンドでビデオを見ることが可能になります。

          カード入れとウォレット:
          内側にはのカード入れ2つとウォレットがつき、カードやお札を収納できますから、財布を持ち歩く必要がなくなります。

          おしゃれなデザイン:
          シンプルな外観は誰にでも適しており、余裕なデザインはなく、日常のニーズを満たし、ビジネスの場面も問題がございません。長く使ってもポストシーズンになりません。`}
        </p>
        <div className="flex justify-between items-center mb-6">
          <span className="text-3xl font-bold text-pink-600">¥1,800</span>
          <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-2 px-6 rounded-full transform hover:scale-105 transition duration-300 ease-in-out shadow-md">
            カートに追加
          </button>
        </div>
        
        <div className="border-t border-purple-200 pt-4">
          <h3 className="text-lg font-semibold text-purple-700 mb-4">レビュー</h3>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.map((review, index) => (
                <Review 
                  key={index}
                  rating={review.rating}
                  author={review.author}
                  comment={review.comment}
                  age={review.age + "歳"}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-600 italic">Loading reviews...</p>
          )}
        </div>
      </main>
    </div>
  );
};

const Review = ({ rating, author, comment, age }) => (
  <div className="border-b border-purple-200 pb-3 last:border-b-0">
    <div className="flex items-center mb-1">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          fill={i < rating ? "gold" : "none"}
          stroke={i < rating ? "gold" : "currentColor"}
        />
      ))}
      <span className="ml-2 font-semibold text-purple-700">{author}</span>
      <span className="ml-2 font-semibold text-purple-700">{age}</span>
    </div>
    <p className="text-gray-600">{comment}</p>
  </div>
);

export default ProductPage;