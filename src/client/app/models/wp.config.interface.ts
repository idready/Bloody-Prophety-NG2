interface Wp {
    PAGES: string;
    POSTS: string;
    COMMENTS: string;
    CATEGORIES: string;
}

interface CommentsStatus {
    APPROVE?: string;
    PENDING?: string;
    SPAM?: string;
    DELETE?: string;
    TRASH?: string;
}

export interface WpConfig {
    readonly WP?: Wp;
    readonly COMMENTS_STATUS?: CommentsStatus;
}

export interface Comment {
    author: string;
    author_email: string;
    author_ip: number;
    author_name: string;
    author_url: string;
    content: string;
    date: Date;
    date_gmt: string;
    karma: string;
    parent: number;
    post: number;
    status: CommentsStatus;
    type: string;
    meta: string;
    length?: number;
}
