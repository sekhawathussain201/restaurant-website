import React, { useState } from 'react'
import { Play, Sparkles, Film, Video, Share2, Camera, Music2, ExternalLink, Download, Layers } from 'lucide-react'

const VIDEOS = [
  {
    id: 'reel',
    title: 'Instagram & TikTok Short Reel',
    subtitle: '9:16 Vertical Video (26s) • High Energy Beat-Synced Animations',
    src: '/media/reel-video.mp4',
    format: '9:16 Story Format',
    tag: 'Trending Reel',
    desc: 'Features fast-paced charcoal flame animations, saffron aroma dum pukht biryani, and live Karachi order tracking.',
  },
  {
    id: 'tour',
    title: 'Full Restaurant Website Tour',
    subtitle: '16:9 Landscape Video (55s) • Page-by-Page Smooth Walkthrough',
    src: '/media/tour-video.mp4',
    format: '16:9 Cinema Wide',
    tag: 'Full Tour',
    desc: 'A complete walk-through across Home, Menu, Order Now, Live Tracking, and Verified Customer Reviews.',
  },
  {
    id: 'square',
    title: 'Social Feed Square Promo',
    subtitle: '1:1 Square Video (26s) • Tailored for Instagram & Facebook Feeds',
    src: '/media/square-promo.mp4',
    format: '1:1 Square Feed',
    tag: 'Feed Promo',
    desc: 'Crafted with bold typography and royal gold branding to stand out on social media feeds.',
  },
]

const GRAPHICS = [
  {
    title: 'Royal Launch Announcement',
    desc: 'Official launch card with brand hook and live website link',
    file: '/media/launch-card.jpg',
    aspect: 'Square 1:1',
  },
  {
    title: 'Dum Pukht Royal Biryani',
    desc: 'Signature saffron aroma biryani highlight card',
    file: '/media/feature-portrait-20261011-064636.jpg',
    aspect: 'Portrait 4:5',
  },
  {
    title: 'Live Charcoal BBQ Sizzlers',
    desc: 'Artisanal seekh kebabs and charcoal sizzlers card',
    file: '/media/feature-portrait-20261011-064643.jpg',
    aspect: 'Portrait 4:5',
  },
  {
    title: 'Peshawari Shinwari Karahi',
    desc: 'Desi makhan cooked Shinwari Karahi showcase',
    file: '/media/feature-portrait-20261011-064648.jpg',
    aspect: 'Portrait 4:5',
  },
  {
    title: 'Express Kitchen Full Menu',
    desc: 'Complete restaurant menu with 30-min delivery promise',
    file: '/media/list-square-20261011-064655.jpg',
    aspect: 'Square 1:1',
  },
]

export function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState(VIDEOS[0])
  const [tab, setTab] = useState('videos') // 'videos' | 'cards'

  return (
    <section id="media-showcase" className="relative py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12 relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Film className="w-4 h-4 text-amber-400" />
          <span>Royal Media & Automation Studio</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white font-['Playfair_Display']">
          Watch Zaiqa Royal Grill In Action
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-3 leading-relaxed">
          AI automation videos and launch graphics rendered live with Remotion & FFmpeg for our official social media channels (<span className="text-orange-400 font-semibold">@sekhawatarain</span> on TikTok & <span className="text-orange-400 font-semibold">@sekhawatarain79</span> on Instagram).
        </p>

        {/* View Toggle */}
        <div className="mt-6 inline-flex p-1 rounded-2xl bg-gray-900 border border-gray-800">
          <button
            onClick={() => setTab('videos')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              tab === 'videos'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>3 Promo Videos</span>
          </button>
          <button
            onClick={() => setTab('cards')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all ${
              tab === 'cards'
                ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>5 Social Post Cards</span>
          </button>
        </div>
      </div>

      {tab === 'videos' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Video Selector Sidebar (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="text-xs uppercase tracking-wider text-gray-400 font-bold px-1">
              Select Video Style ({VIDEOS.length} Renders)
            </h3>
            {VIDEOS.map((v) => {
              const isSelected = activeVideo.id === v.id
              return (
                <button
                  key={v.id}
                  onClick={() => setActiveVideo(v)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-gray-900 to-orange-950/40 border-orange-500/60 shadow-xl shadow-orange-500/10'
                      : 'bg-gray-900/60 hover:bg-gray-900/90 border-gray-800 text-gray-300 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                      {v.tag}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{v.format}</span>
                  </div>
                  <h4 className="text-base font-extrabold text-white font-['Playfair_Display']">
                    {v.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {v.desc}
                  </p>
                </button>
              )
            })}

            {/* Social badges */}
            <div className="p-4 rounded-2xl bg-gray-900/40 border border-gray-800/80 flex items-center justify-between text-xs text-gray-400">
              <span className="flex items-center gap-1.5">
                <Music2 className="w-4 h-4 text-orange-400" />
                TikTok: <b className="text-white">@sekhawatarain</b>
              </span>
              <span className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-pink-400" />
                IG: <b className="text-white">@sekhawatarain79</b>
              </span>
            </div>
          </div>

          {/* Active Video Player (7 Cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-gray-900/80 border border-gray-800 p-4 sm:p-6 shadow-2xl relative">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
              <div>
                <h3 className="text-lg font-bold text-white font-['Playfair_Display']">
                  {activeVideo.title}
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">{activeVideo.subtitle}</p>
              </div>
              <a
                href={activeVideo.src}
                download
                className="px-3 py-1.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
                title="Download video"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save MP4</span>
              </a>
            </div>

            {/* Video Element */}
            <div className="relative rounded-2xl overflow-hidden bg-black flex items-center justify-center max-h-[580px]">
              <video
                key={activeVideo.src}
                src={activeVideo.src}
                controls
                playsInline
                preload="metadata"
                className={`w-full max-h-[560px] object-contain rounded-2xl ${
                  activeVideo.id === 'reel' ? 'max-w-[320px] mx-auto aspect-[9/16]' : 'aspect-video'
                }`}
              />
            </div>
          </div>
        </div>
      ) : (
        /* Social Post Cards Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {GRAPHICS.map((g, i) => (
            <div
              key={i}
              className="group rounded-2xl bg-gray-900/80 border border-gray-800 overflow-hidden hover:border-orange-500/50 transition-all flex flex-col shadow-xl"
            >
              <div className="relative overflow-hidden bg-gray-950 aspect-square flex items-center justify-center">
                <img
                  src={g.file}
                  alt={g.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-bold text-orange-400 border border-orange-500/30">
                  {g.aspect}
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-['Playfair_Display']">
                    {g.title}
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">{g.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-gray-800 flex items-center justify-between">
                  <a
                    href={g.file}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-orange-400 hover:text-orange-300 flex items-center gap-1"
                  >
                    <span>View Full Size</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={g.file}
                    download
                    className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
                    title="Download"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
