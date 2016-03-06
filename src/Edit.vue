<template>
  <main>
    <section class="section section-browser">
      <p>
        <a v-link="{ path: '/.hello' }">hello</a>
        <a v-link="{ path: '/.config' }">config</a>
        <a v-link="{ path: '/datasets/wut' }">dataset</a>

      </p>
      <recent-fragments :list="fragmentCache"></recent-fragments>
      <p>
      {{blub}}
      </p>

    </section>
    <section class="section section-editor">
      <fragment-editor v-if="uri" :fragments="fragmentCache" :uri="uri"></fragment-editor>
    </section>
  </main>
</template>

<script>
import RecentFragments from './components/RecentFragments'
import FragmentEditor from './components/FragmentEditor'

export default {
  components: {
    RecentFragments,
    FragmentEditor
  },
  data () {
    return {
      blub: 15,
      uri: false,
      fragmentCache: {}
    }
  },
  route: {
    canReuse: function (transition) {
      return false
    }
  },
  ready () {
    // console.log('edit', this.$route.path)

    // Wait for server...
    this.fragmentCache = {
      'projects:dekastartcom': {
        '@context': {
          'schema': 'http://schema.org/'
        },
        '@id': 'https://thomasg.be/ld/store/projects/dekastart.com',
        '@type': 'WebSite',
        'schema:name': 'DeKastart.com',
        'schema:description': 'Website voor Restaurant De Kastart in Gent.',
        'schema:url': 'https://www.dekastart.com',
        'schema:about': {
          '@id': 'https://thomasg.be/ld/store/projects/restaurantdekastart'
        },
        'schema:author': 'Thomas & Juta',
        'schema:releasedEvent': 'june 2013',
        'schema:provider': 'thomasg.be'
      },
      'projects:thomasgbe': {
        '@context': {
          'schema': 'http://schema.org/'
        },
        '@id': 'https://thomasg.be/ld/store/projects/thomasg.be',
        '@type': 'WebSite',
        'schema:name': 'thomasg.be',
        'schema:description': 'Website voor Restaurant De Kastart in Gent.',
        'schema:url': 'https://www.dekastart.com',
        'schema:about': {
          '@id': 'https://thomasg.be/thomas'
        },
        'schema:author': 'Thomas',
        'schema:releasedEvent': '2014',
        'schema:provider': 'thomasg.be'
      },
      'thomasg:thomas': {
        '@context': {
          'schema': 'http://schema.org/'
        },
        '@id': 'https://thomasg.be/thomas',
        '@type': 'Person',
        'schema:name': 'Thomas Ghysels',
        'schema:description': 'Something that would be written on an about page',
        'schema:url': 'https://www.thomasg.be',
        'schema:girlfriend': {
          '@id': 'https://thomasg.be/juta'
        }
      }
    }
    let uri = this.$route.path.substring(1)
    if (uri in this.fragmentCache) {
      this.uri = uri
    } else {
      console.warn('watcha doin?', uri)
    }
  }
}
</script>

<style lang="scss">
@import 'scss/variables.scss';
@import 'scss/shame.scss';

@import 'scss/reset';
@import 'scss/structure';
@import 'scss/browser';
@import 'scss/editor';
@import 'scss/inp';
@import 'scss/btn';
</style>
