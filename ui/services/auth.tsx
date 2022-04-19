import React from 'react';

export const TOKEN_KEY = "@nutriverde-Token";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;

export const getToken = () =>  localStorage.getItem(TOKEN_KEY); 

export const login = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};