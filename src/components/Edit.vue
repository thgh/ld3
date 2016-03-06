<template>
  <main>
    <section class="section section-browser">
      <p>
        <a href="#!home">home</a>
        <a href="#!conf">config</a>
        <a href="#!dataset/wut">dataset/wut</a>
        <a href="#!projects:dekastart">projects:dekastart</a>

      </p>
      <recent-fragments :list="fragmentCache" :route="route"></recent-fragments>
      <p>
      {{blub}}
      </p>

    </section>
    <section class="section section-editor">
      <fragment v-if="route.uri" :fragments="fragmentCache" :uri="route.uri"></fragment>
    </section>
  </main>
</template>

<script>
import RecentFragments from './RecentFragments'
import Fragment from './Fragment'

export default {
  props: ['route'],
  components: {
    RecentFragments,
    Fragment
  },
  data () {
    return {
      blub: 15,
      fragmentCache: {}
    }
  },
  route: {
    canReuse: function (transition) {
      return false
    }
  },
  ready () {
    // console.info(window.location)
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
        'schema:author': [
          {'@id': 'thomasg:thomas'},
          {'@id': 'thomasg:juta'},
          {'@id': 'thomasg:markske'}
        ],
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
    this.route.uri = window.location.hash.substr(2)
  }
}
</script>
