const httpsPattern = /^https:\/\/.+?\//;
const sshPattern = /^.+?@.+?:/;

const GitUrl = {
    create(slug, options) {
        if (httpsPattern.test(slug) || sshPattern.test(slug)) {
            return slug;
        }
        var ssh = options && options.ssh;
        if (ssh) {
            return `git@github.com:${slug}.git`;
        }
        else {
            return `https://github.com/${slug}.git`;
        }
    }
};

module.exports = GitUrl;
