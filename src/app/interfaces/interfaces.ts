import React from "react";

export interface CategorySchema {
  creationAt: string;
  id: number;
  image: string;
  name: string;
  updatedAt: string;
}

export interface CategorySchemaCreate {
  image: string;
  name: string;
}

export interface ProductSchema {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
}
export interface ProductSchemaCreate {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}
export interface CartProductSchema {
  id: number;
  title: string;
  price: number;
  description: string;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  quantity: number;
}
export interface CardProductCartProps {
  product: CartProductSchema;
  onSubstract: Function;
  onAdd: Function;
  onRemove: Function;
}
export interface ChildrenType {
  children: React.ReactNode;
}

export interface ButtonType {
  children: React.ReactNode;
  purple: boolean;
  func?: (() => void) | ((e: React.MouseEvent<HTMLElement>) => void);
}
export interface ContainerButtonProps {
  children: React.ReactNode;
  column: boolean;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginDataResponse {
  access_token: string;
}

export interface CreateUserData {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
export interface UserDataResponse {
  id: number;
  name: string;
  role: string;
  email: string;
  password: string;
  avatar: string;
}

//Contexts

export interface AuthContextType {
  accessToken: UserLoginDataResponse | null;
  signin: (accessToken: UserLoginDataResponse, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
}
export interface UserContextType {
  user: UserDataResponse | null;
  updateUser: (userData: UserDataResponse | null) => void;
}

export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface CartContextType {
  items: CartProductSchema[];
  addItem: (item: ProductSchema) => void;
  substractItem: (id: number) => void;
  removeItem: (id: number) => void;
  total: number;
  countItems: number;
  resetCart: ()=>void;
}
