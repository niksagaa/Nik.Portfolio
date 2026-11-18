import { createClient } from '@/utils/supabase/client';
import { Testimonial } from '@/types';

const supabase = await createClient()

export async function getApprovedComments() {
    const { data, error } = await supabase
        .from('testimonials')
        .select("*")
        .order('date', { ascending: false });

    if (error) {
        throw new Error("Error fetching testimonial: " + error.message);
    }
    return data || [];
}

export async function comment(testimonial: Testimonial) {
    const payload = {
        name: testimonial.name,
        role: testimonial.role,
        message: testimonial.message,
        rating: testimonial.rating,
        date: testimonial.date,
        is_approved: false
    };

    const { data, error } = await supabase
        .from('testimonials')
        .insert([payload])
        .select("*");

    if (error) {
        throw new Error("Error sending testimonials: " + error.message);
    }
    return data || [];
}