import React from "react";

export interface CategorySchema {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

export interface ProductSchema {
  id: number,
  title: string,
  price: number,
  description: string,
  category: {
    id: number,
    name: string,
    image: string
  },
  images: string[]
}

export interface  ChildrenType {
    children: React.ReactNode
}

export interface ButtonType {
  children: React.ReactNode,
  purple: boolean
}
