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
    readonly WP?:: Wp;
    readonly COMMENTS_STATUS?: CommentsStatus;
}
