const apiKey = process.env.REACT_APP_RSS_TO_JSON_API_KEY;

const getFeedInfo = async (feedId, count = 50) => {
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${feedId}&api_key=${apiKey}&count=${count}`);
        const { feed, items } = await response.json();
        return { feed, items };
    } catch (err) {
        return err;
    }
}

export { getFeedInfo };
