const should = require('should');

const GitUrl = require('../lib/git-url');

describe('GitUrl', () => {

    it('should be defined', () => {
        should(GitUrl).be.ok();
    });

    describe('.create', () => {

        describe('given slug with user and repo combo 1', () => {

            var slug;
            beforeEach(() => {
                slug = 'reykjavikingur/web-dev-lab';
            });

            it('should generate correct string', () => {
                var actual = GitUrl.create(slug);
                should(actual).eql('https://github.com/reykjavikingur/web-dev-lab.git');
            });

            describe('with ssh option', () => {
                it('should generate correct string', () => {
                    var actual = GitUrl.create(slug, {ssh: true});
                    should(actual).eql('git@github.com:reykjavikingur/web-dev-lab.git');
                });
            });

        });

        describe('given slug with org and repo combo 2', () => {
            var slug;
            beforeEach(() => {
                slug = 'Atomic-Reactor/Toolkit';
            });

            it('should generate correct string', () => {
                var actual = GitUrl.create(slug);
                should(actual).eql('https://github.com/Atomic-Reactor/Toolkit.git');
            });

            describe('with ssh option', () => {
                it('should generate correct string', () => {
                    var actual = GitUrl.create(slug, {ssh: true});
                    should(actual).eql('git@github.com:Atomic-Reactor/Toolkit.git');
                });
            });
        });

        describe('given full https git url',()=>{
            var url;
            beforeEach(()=>{
                url = 'https://github.com/reykjavikingur/web-dev-lab.git';
            });
            it('should return same url',()=>{
                var actual = GitUrl.create(url);
                should(actual).eql(url);
            });
        });

        describe('given full ssh git url',()=>{
            var url;
            beforeEach(()=>{
                url = 'git@github.com:Atomic-Reactor/Toolkit.git';
            });
            it('should return same url',()=>{
                var actual = GitUrl.create(url);
                should(actual).eql(url);
            });
        });

    });

});
