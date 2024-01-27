module.exports = {
    bytesToSize: function(bytes, separator = "") {
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        if (bytes === 0) return 'n/a';

        const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10);
        const formattedSize = (i === 0) ? `${bytes}${separator}${sizes[i]}` : `${(bytes / (1024 ** i)).toFixed(1)}${separator}${sizes[i]}`;

        return formattedSize;
    }
};