/**
 * Quote
 * A Quote
 */
declare interface Quote {
    id?: number;
    createdAt?: string | null;
    likes?: number | null;
    movieId?: number | null;
    quote: string;
    saidBy: string;
}
export { Quote };
