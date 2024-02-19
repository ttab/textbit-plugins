export const CONFIG = {
  supported: [
    {
      url: 'open.spotify.com',
      endpoint: 'https://open.spotify.com/oembed?url=' // rich
    },
    {
      url: 'youtube.com/watch',
      endpoint: 'https://www.youtube.com/oembed?format=json&url=' // video
    },
    {
      url: 'vimeo.com',
      endpoint: 'https://vimeo.com/api/oembed.json?url=' // video
    },
    {
      url: 'gfycat.com',
      endpoint: 'https://api.gfycat.com/v1/oembed?url=' // video
    },
    {
      url: 'soundcloud.com',
      endpoint: 'https://soundcloud.com/oembed?url=' // rich
    },
    {
      url: 'on.soundcloud.com',
      endpoint: 'https://soundcloud.com/oembed?url=' // righ
    },
    {
      url: 'soundcloud.app.goog.gl',
      endpoint: 'https://soundcloud.com/oembed?url=' // rich
    },
    {
      url: 'tiktok.com',
      endpoint: 'https://www.tiktok.com/oembed?url=' // video
    }
    // {
    //     url: 'play.acast.com',
    //     endpoint: 'https://oembed.acast.com/v1/embed-player?url=' // rich, cors!
    // },
    // {
    //     url: 'giphy.com/gifs',
    //     endpoint: 'https://giphy.com/services/oembed?url=' // cors!
    // },
    // {
    //     url: 'giphy.com/clips',
    //     endpoint: 'https://giphy.com/services/oembed?url=' // cors!
    // },
    // {
    //     url: 'gph.is',
    //     endpoint: 'https://giphy.com/services/oembed?url=' // cors!
    // },
    // {
    //     url: 'pinterest.',
    //     endpoint: 'https://www.pinterest.com/oembed.json?url=' // rich, cors!
    // }
  ]
}
