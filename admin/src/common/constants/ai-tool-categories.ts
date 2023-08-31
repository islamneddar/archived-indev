export enum AiToolCategoryEnum {
    // TEXT & WRITING
    COPYWRITING = 'copywriting',
    GENERAL_WRITING = 'general_writing',
    STORY_TELLER = 'story_teller',
    EMAIL_ASSISTANT = 'email_assistant',
    PARAPHASER = 'paraphaser',
    SUMMARIZER = 'summarizer',

    // IMAGE
    ART = 'art',
    DESIGN_ASSISTANT = 'design_assistant',
    IMAGE_GENERATOR = 'image_generator',
    DESIGN = 'design',
    AVATARS = 'avatars',
    IMAGE_EDITING = 'image_editing',
    LOGO_GENERATOR = 'logo_generator',

    // Audio
    AUDIO_EDITING = 'audio_editing',
    TEXT_TO_SPEECH = 'text_to_speech',
    MUSIC = 'music',
    TRANSCRIBER = 'transcriber',

    // VIDEO
    PERSONALIZED_VIDEO = 'personalized_video',
    VIDEO_GENERATOR = 'video_generator',
    VIDEO_EDITOR = 'video_editor',
    THREE_D_VIDEO = '3d_video',

    // marketing
    SEO = 'seo',
    E_COMMERCE = 'e-commerce',
    MARKETING = 'marketing',
    SOCIAL_MEDIA_ASSISTANT = 'social_media_assistant',
    SALES = 'sales',
    EMAIL_MARKETING = 'email_marketing',

    //lifestyle & entertainment
    FASHION = 'fashion',
    FUN_TOOLS = 'fun_tools',
    GIFT_IDEA = 'gift_idea',
    LIFE_ASSISTANT = 'life_assistant',
    FITNESS = 'fitness',
    DATING = 'dating',
    AI_MEME_GENERATOR = 'ai_meme_generator',
    REAL_ESTATE = 'real_estate',
    GAMING = 'gaming',
    HEALTHCARE = 'healthcare',
    MEMORY = 'memory',
    TRAVEL = 'travel',

    //DEVELOPMENT
    PROMPTS = 'prompts',
    DEVELOPER = 'developer',
    SPREADSHEET = 'spreadsheet',
    TESTING_QA = 'testing_qa',
    CODE_ASSISTANT = 'code_assistant',
    NO_CODE = 'low_code',
    SQL = 'sql',

    // BUSINESS
    CUSTOMER_SUPPORT = 'customer_support',
    HUMAN_RESOURCES = 'human_resources',
    PRESENTATION = 'presentation',
    STARTUP = 'startup',
    FINANCE = 'finance',
    LEGAL_ASSISTANT = 'legal_assistant',
    PRODUCTIVITY = 'productivity',

    //EDUCATION && INFORMATION
    EDUCATION_ASSISTANT = 'education_assistant',
    RESEARCH = 'research',
    AI_SEARCH_ENGINE = 'ai_search_engine',
    EXPERIMENTS = 'experiments',
    RESOURCE = 'resource',
}

export const listAiToolCategory = {
    [AiToolCategoryEnum.COPYWRITING]: {
        type: AiToolCategoryEnum.COPYWRITING,
        name: 'Copy writing',
    },
    [AiToolCategoryEnum.GENERAL_WRITING]: {
        type: AiToolCategoryEnum.GENERAL_WRITING,
        name: 'General writing',
    },
    [AiToolCategoryEnum.STORY_TELLER]: {
        type: AiToolCategoryEnum.STORY_TELLER,
        name: 'Story teller',
    },
    [AiToolCategoryEnum.EMAIL_ASSISTANT]: {
        type: AiToolCategoryEnum.EMAIL_ASSISTANT,
        name: 'Email assistant',
    },
    [AiToolCategoryEnum.PARAPHASER]: {
        type: AiToolCategoryEnum.PARAPHASER,
        name: 'Paraphaser',
    },
    [AiToolCategoryEnum.SUMMARIZER]: {
        type: AiToolCategoryEnum.SUMMARIZER,
        name: 'Summarizer',
    },
    [AiToolCategoryEnum.ART]: {
        type: AiToolCategoryEnum.ART,
        name: 'Art',
    },
    [AiToolCategoryEnum.DESIGN_ASSISTANT]: {
        type: AiToolCategoryEnum.DESIGN_ASSISTANT,
        name: 'Design assistant',
    },
    [AiToolCategoryEnum.IMAGE_GENERATOR]: {
        type: AiToolCategoryEnum.IMAGE_GENERATOR,
        name: 'Image generator',
    },
    [AiToolCategoryEnum.DESIGN]: {
        type: AiToolCategoryEnum.DESIGN,
        name: 'Design',
    },
    [AiToolCategoryEnum.AVATARS]: {
        type: AiToolCategoryEnum.AVATARS,
        name: 'Avatars',
    },
    [AiToolCategoryEnum.IMAGE_EDITING]: {
        type: AiToolCategoryEnum.IMAGE_EDITING,
        name: 'Image editing',
    },
    [AiToolCategoryEnum.LOGO_GENERATOR]: {
        type: AiToolCategoryEnum.LOGO_GENERATOR,
        name: 'Logo generator',
    },
    [AiToolCategoryEnum.AUDIO_EDITING]: {
        type: AiToolCategoryEnum.AUDIO_EDITING,
        name: 'Audio editing',
    },
    [AiToolCategoryEnum.TEXT_TO_SPEECH]: {
        type: AiToolCategoryEnum.TEXT_TO_SPEECH,
        name: 'Text to speech',
    },
    [AiToolCategoryEnum.MUSIC]: {
        type: AiToolCategoryEnum.MUSIC,
        name: 'Music',
    },
    [AiToolCategoryEnum.TRANSCRIBER]: {
        type: AiToolCategoryEnum.TRANSCRIBER,
        name: 'Transcriber',
    },
    [AiToolCategoryEnum.PERSONALIZED_VIDEO]: {
        type: AiToolCategoryEnum.PERSONALIZED_VIDEO,
        name: 'Personalized video',
    },
    [AiToolCategoryEnum.VIDEO_GENERATOR]: {
        type: AiToolCategoryEnum.VIDEO_GENERATOR,
        name: 'Video generator',
    },
    [AiToolCategoryEnum.VIDEO_EDITOR]: {
        type: AiToolCategoryEnum.VIDEO_EDITOR,
        name: 'Video editor',
    },
    [AiToolCategoryEnum.THREE_D_VIDEO]: {
        type: AiToolCategoryEnum.THREE_D_VIDEO,
        name: '3D video',
    },
    [AiToolCategoryEnum.SEO]: {
        type: AiToolCategoryEnum.SEO,
        name: 'SEO',
    },
    [AiToolCategoryEnum.E_COMMERCE]: {
        type: AiToolCategoryEnum.E_COMMERCE,
        name: 'E-commerce',
    },
    [AiToolCategoryEnum.MARKETING]: {
        type: AiToolCategoryEnum.MARKETING,
        name: 'Marketing',
    },
    [AiToolCategoryEnum.SOCIAL_MEDIA_ASSISTANT]: {
        type: AiToolCategoryEnum.SOCIAL_MEDIA_ASSISTANT,
        name: 'Social media assistant',
    },
    [AiToolCategoryEnum.SALES]: {
        type: AiToolCategoryEnum.SALES,
        name: 'Sales',
    },
    [AiToolCategoryEnum.EMAIL_MARKETING]: {
        type: AiToolCategoryEnum.EMAIL_MARKETING,
        name: 'Email marketing',
    },
    [AiToolCategoryEnum.FASHION]: {
        type: AiToolCategoryEnum.FASHION,
        name: 'Fashion',
    },
    [AiToolCategoryEnum.FUN_TOOLS]: {
        type: AiToolCategoryEnum.FUN_TOOLS,
        name: 'Fun tools',
    },
    [AiToolCategoryEnum.GIFT_IDEA]: {
        type: AiToolCategoryEnum.GIFT_IDEA,
        name: 'Gift idea',
    },
    [AiToolCategoryEnum.LIFE_ASSISTANT]: {
        type: AiToolCategoryEnum.LIFE_ASSISTANT,
        name: 'Life assistant',
    },
    [AiToolCategoryEnum.FITNESS]: {
        type: AiToolCategoryEnum.FITNESS,
        name: 'Fitness',
    },
    [AiToolCategoryEnum.DATING]: {
        type: AiToolCategoryEnum.DATING,
        name: 'Dating',
    },
    [AiToolCategoryEnum.AI_MEME_GENERATOR]: {
        type: AiToolCategoryEnum.AI_MEME_GENERATOR,
        name: 'AI meme generator',
    },
    [AiToolCategoryEnum.REAL_ESTATE]: {
        type: AiToolCategoryEnum.REAL_ESTATE,
        name: 'Real estate',
    },
    [AiToolCategoryEnum.GAMING]: {
        type: AiToolCategoryEnum.GAMING,
        name: 'Gaming',
    },
    [AiToolCategoryEnum.HEALTHCARE]: {
        type: AiToolCategoryEnum.HEALTHCARE,
        name: 'Healthcare',
    },
    [AiToolCategoryEnum.MEMORY]: {
        type: AiToolCategoryEnum.MEMORY,
        name: 'Memory',
    },
    [AiToolCategoryEnum.TRAVEL]: {
        type: AiToolCategoryEnum.TRAVEL,
        name: 'Travel',
    },
    [AiToolCategoryEnum.PROMPTS]: {
        type: AiToolCategoryEnum.PROMPTS,
        name: 'Prompts',
    },
    [AiToolCategoryEnum.DEVELOPER]: {
        type: AiToolCategoryEnum.DEVELOPER,
        name: 'Developer',
    },
    [AiToolCategoryEnum.SPREADSHEET]: {
        type: AiToolCategoryEnum.SPREADSHEET,
        name: 'Spreadsheet',
    },
    [AiToolCategoryEnum.TESTING_QA]: {
        type: AiToolCategoryEnum.TESTING_QA,
        name: 'Testing QA',
    },
    [AiToolCategoryEnum.CODE_ASSISTANT]: {
        type: AiToolCategoryEnum.CODE_ASSISTANT,
        name: 'Code assistant',
    },
    [AiToolCategoryEnum.NO_CODE]: {
        type: AiToolCategoryEnum.NO_CODE,
        name: 'No code',
    },
    [AiToolCategoryEnum.SQL]: {
        type: AiToolCategoryEnum.SQL,
        name: 'SQL',
    },
    [AiToolCategoryEnum.CUSTOMER_SUPPORT]: {
        type: AiToolCategoryEnum.CUSTOMER_SUPPORT,
        name: 'Customer support',
    },
    [AiToolCategoryEnum.HUMAN_RESOURCES]: {
        type: AiToolCategoryEnum.HUMAN_RESOURCES,
        name: 'Human resources',
    },
    [AiToolCategoryEnum.PRESENTATION]: {
        type: AiToolCategoryEnum.PRESENTATION,
        name: 'Presentation',
    },
    [AiToolCategoryEnum.STARTUP]: {
        type: AiToolCategoryEnum.STARTUP,
        name: 'Startup',
    },
    [AiToolCategoryEnum.FINANCE]: {
        type: AiToolCategoryEnum.FINANCE,
        name: 'Finance',
    },
    [AiToolCategoryEnum.LEGAL_ASSISTANT]: {
        type: AiToolCategoryEnum.LEGAL_ASSISTANT,
        name: 'Legal assistant',
    },
    [AiToolCategoryEnum.PRODUCTIVITY]: {
        type: AiToolCategoryEnum.PRODUCTIVITY,
        name: 'Productivity',
    },
    [AiToolCategoryEnum.EDUCATION_ASSISTANT]: {
        type: AiToolCategoryEnum.EDUCATION_ASSISTANT,
        name: 'Education assistant',
    },
    [AiToolCategoryEnum.RESEARCH]: {
        type: AiToolCategoryEnum.RESEARCH,
        name: 'Research',
    },
    [AiToolCategoryEnum.AI_SEARCH_ENGINE]: {
        type: AiToolCategoryEnum.AI_SEARCH_ENGINE,
        name: 'AI search engine',
    },
    [AiToolCategoryEnum.EXPERIMENTS]: {
        type: AiToolCategoryEnum.EXPERIMENTS,
        name: 'Experiments',
    },
    [AiToolCategoryEnum.RESOURCE]: {
        type: AiToolCategoryEnum.RESOURCE,
        name: 'Resource',
    },
};
