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

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginDataResponse {
  access_token: string;
}

export interface CreateUserData{	
  name: string;
  email: string;	
  password: string;	
  avatar: string;
}
export interface CreateUserDataResponse{
  id:	number;	
  name: string;
  role: string;
  email: string;	
  password: string;	
  avatar: string;
}

//Contexts

export interface AuthContextType {
  user: UserLoginDataResponse | null;
  signin: (user: UserLoginDataResponse, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}