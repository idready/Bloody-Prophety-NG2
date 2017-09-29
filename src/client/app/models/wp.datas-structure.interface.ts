import { Comment } from './wp.config.interface';

interface Guid {
    rendered?: string;
}

interface Content {
    protected: boolean;
    rendered: string | undefined;
}

interface Excerpt extends Content {
}

interface Title extends Content {
}

interface Status {
    [key: string]: 'publish' | 'future' | 'draft' | 'pending' | 'private';
}

interface CommentsStatus {
    [key: string]: 'open' | 'close';
}

interface PingStatus extends CommentsStatus {
}

interface ACF {
    page_position?: number;
    extraits_livre?: string;
    page_id: string | number; // Type-check makes verification based on this order
    citatation_auteur?: string | null | undefined;
    partenaires: string;
    revendeurs: string;
}

/**
 * [WpPageStructure Page structure]
 * @type {interface}
 */
export interface WpPageStructure {

    acf?: ACF;
    date: string | Date;
    date_gmt: string | Date;
    guid: Guid;
    id: number;
    link: string;
    modified: string | Date;
    modified_gmt: string | Date;
    slug: string;
    status: Status;
    type: string;
    parent: number;
    title: Title;
    content: Content;
    author: number;
    excerpt: Excerpt;
    featured_media: number;
    comment_status: CommentsStatus;
    ping_status: PingStatus;
    menu_order: number;
    meta: Array<object>;
    template:  string;
    comments: Comment | Comment[];
}

/**
 * [WpPostStructure Post structure; extends page]
 * @type {interface}
 */
export interface WpPostStructure extends WpPageStructure {
    format: string;
    password: string;
    sticky: boolean;
    categories: Array<number>;
    tags: Array<string>;
    liveblog_likes: number;
}
