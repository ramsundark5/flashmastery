class ColorGenerator{
        /**
     * Thanks to Cristian Sanchez
     * @url http://stackoverflow.com/a/3426956/4185200
     *
     * @param {String} str
     * @return {String}
     */
    hashCode(str) {
        let hash = 0, i = 0;
        for(i; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash);
        return hash;
    }

    /**
     * Thanks to Cristian Sanchez
     * @url http://stackoverflow.com/a/3426956/4185200
     *
     * @param {Integer} int
     * @return {String}
     */
    intToRGB(i) {
        let c = (i & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }

    /**
     * Get color with username
     * @return {String}
     */
    getColor(text) {
        let hash = this.hashCode(text);
        return "#"+this.intToRGB(hash);
    }
}

export default new ColorGenerator();