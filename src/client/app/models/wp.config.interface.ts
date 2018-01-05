/**
 *
 * Wordpress config Urls
 * @interface Wp
 */
interface Wp {
    OAUTH: string;
    PAGES: string;
    POSTS: string;
    COMMENTS: string;
    CATEGORIES: string;
}

/**
 *
 * Known comment status
 * @interface CommentsStatus
 */
interface CommentsStatus {
    APPROVE?: string;
    PENDING?: string;
    SPAM?: string;
    DELETE?: string;
    TRASH?: string;
}

/**
 *
 * Full wp config item
 * @export
 * @interface WpConfig
 */
export interface WpConfig {
    readonly WP?: Wp;
    readonly COMMENTS_STATUS?: CommentsStatus;
}

/**
 *
 * Comment item
 * @export
 * @interface Comment
 */
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
