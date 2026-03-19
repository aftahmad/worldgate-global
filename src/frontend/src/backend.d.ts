import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Testimonial {
    service: string;
    review: string;
    country: string;
    name: string;
    rating: number;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    author: string;
    excerpt: string;
    category: Category;
}
export type Time = bigint;
export interface Booking {
    name: string;
    email: string;
    serviceInterest: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface ContactInquiry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum Category {
    visa = "visa",
    immigrationLaw = "immigrationLaw",
    study = "study",
    employment = "employment",
    citizenship = "citizenship"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addTestimonial(name: string, country: string, rating: number, review: string, service: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createBlogPost(title: string, excerpt: string, content: string, category: Category, author: string): Promise<bigint>;
    createConsultationBooking(name: string, email: string, phone: string, serviceInterest: string, message: string): Promise<void>;
    createContactInquiry(name: string, email: string, phone: string, message: string): Promise<void>;
    deleteBlogPost(id: bigint): Promise<void>;
    getAllBlogPosts(): Promise<Array<BlogPost>>;
    getAllConsultations(): Promise<Array<Booking>>;
    getAllInquiries(): Promise<Array<ContactInquiry>>;
    getAllTestimonials(): Promise<Array<Testimonial>>;
    getBlogPost(id: bigint): Promise<BlogPost | null>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateBlogPost(id: bigint, title: string, excerpt: string, content: string, category: Category, author: string): Promise<boolean>;
}
