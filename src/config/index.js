const DEFAULT_CATEGORY_KEY = 'default';
const TODO_CONFIG = {
    LIMIT_WORDS: 100, // 允许输入的字
    DEFAULT_CATEGORY_KEY,
    // 默认分类
    CATEGORY_LIST: [
        {key: DEFAULT_CATEGORY_KEY, value: '默认'},
        // {key: 'work', value: '工作'},
        // {key: 'home', value: '家庭'},
        // {key: 'study', value: '学习'},
        // {key: 'other', value: '其它'}
    ],
    // 存储层次的key
    STORE_CATEGORY_KEY: '__category',
    STORE_ACTIVE_CATEGORY_KEY: '__active_category',
    STORE_TODO_KEY: '__todoList',
    STORE_DONE_KEY: '__doneList',
    // 显示层次的key
    RENDER_PARSE_KEY: '__parseData',
    RENDER_ACTIVE_KEY: '__active',
    RENDER_STRING_KEY: '__string',
    RENDER_TAGS_KEY: '__tags',
    RENDER_TIME_KEY: '__time',
};

export default TODO_CONFIG;