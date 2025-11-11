"use client";

import { create } from "zustand";
import {
    User,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    GithubAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase-client";
import { setCookie, deleteCookie } from "cookies-next";

interface AuthState {
    user: User | null;
    loading: boolean;
    initialized: boolean;
    register: (email: string, password: string) => Promise<void>;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    initAuthListener: () => void;
    loginWithGoogle: () => Promise<void>;
    loginWithGithub: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    loading: false,
    initialized: false,

    register: async (email, password) => {
        set({ loading: true });
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 });
        } finally {
            set({ loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
            setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 });
        } finally {
            set({ loading: false });
        }
    },

    loginWithGoogle: async () => {
        set({ loading: true });
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 });
        } finally {
            set({ loading: false });
        }
    },

    loginWithGithub: async () => {
        set({ loading: true });
        try {
            const provider = new GithubAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const token = await result.user.getIdToken();
            setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 });
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        await signOut(auth);
        deleteCookie("auth_token", { path: "/" });
        set({ user: null });
    },

    initAuthListener: () => {
        if (typeof window === "undefined") return;
        onAuthStateChanged(auth, (firebaseUser) => {
            set({
                user: firebaseUser,
                initialized: true,
            });

            if (firebaseUser) {
                firebaseUser.getIdToken().then((token) => {
                    setCookie("auth_token", token, { path: "/", maxAge: 60 * 60 * 24 });
                });
            } else {
                deleteCookie("auth_token", { path: "/" });
            }
        });
    },
}));
