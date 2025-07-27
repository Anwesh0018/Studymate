import React from 'react';
import { Link } from 'react-router-dom';

export default function Row({ title, items = [] }) {

    const slugify = (str) =>
    str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <div className="flex space-x-4 overflow-x-auto">
        {items.map((item, index) => {
          const path = `/${title.toLowerCase()}/${slugify(item.title)}`;
          return (
            <Link to={path} key={index} className="w-48 flex-shrink-0">
              <div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-40 h-40 object-cover rounded-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
                />
                <p className="text-sm text-center mt-2">{item.title}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
