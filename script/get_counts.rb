#!/usr/bin/env ruby

require 'rubygems'
require 'json'

graph = {
  'folk' => [
    'indie folk', 
    'indie christmas', 
    'freak folk', 
    'alternative country',
    'folk rock', 
    'new weird america', 
    'country rock', 
    'folk-prog', 
    'traditional folk',
    'traditional country', 
    'british folk'
  ],
  'rock' => [
    'grunge', 
    'power rock',
    'metal',
    'folk rock',
    'neo-psychedelic',
    'indie rock',
    'roots rock',
    'post rock',
    'country rock',
    'pub rock',
  ],
  'pop' => [
    'indie pop',
    'chamber pop',
    'synthpop',
    'singer-songwriter',
    'shimmer pop',
    'noise pop',
    'new wave',
    'dream pop',
    'power pop',
    'alternative pop',
    'acoustic pop'
  ],
  'jazz' => [
    'nu jazz',
    'acid jazz',
    'afrobeat',
    'vocal jazz',
    'cool jazz',
    'latin jazz',
    'electro swing',
    'jazz blues',
    'cabaret'
  ],
  'soul' => [
    'r&b',
    'turntablism',
    'deep funk',
    'neo soul',
    'classic funk rock',
    'southern soul',
    'motown',
    'old school hip hop',
    'hip hop',
    'underground hip hop',
    'traditional blues',
    'country blues',
    'chicago blues',
    'acoustic blues'
  ],

  'electronic' => [
    'indietronica',
    'indie rock',
    'trip hop',
    'chill-out',
    'downtempo',
    'chillwave',
    'nu-gaze',
    'alternative dance',
    'new rave',
    'big beat',
    'metropolis',
    'dance-punk',
    'ambient',
    'minimal techno',
    'house',
    'microhouse',
    'lounge',
    'progressive house',
    'bass music'
  ]
}

top_level_counts = Hash.new(0)
low_level_counts = Hash.new(0)

anne_litt_data = ['Anne_Litt_2010_tagged_v2', 'Anne_Litt_2011_tagged_v2', 'Anne_Litt_2012_tagged_v2',
                  'Anne_Litt_2013_tagged_v2']
base_path = './script_data/'
ext = '.json'

anne_litt_data.each do |fname|
  puts "#{base_path}#{fname}#{ext}"
  f = File.open("#{base_path}#{fname}#{ext}", 'r')
  data = ''
  f.each_line do |line|
    data = JSON.parse(line)
  end
  f.close

  days = data.keys

  days.each do |day|
    data[day].each do |track|
      track['tags']['top_level'].each do |tag|
        top_level_counts[tag] += 1
      end
      if track['tags']['low_level']
        track['tags']['low_level'].each do |tag|
          low_level_counts[tag] += 1
        end
      end
    end
  end

  #ext_v2 = '_counts.json'
  #outfile = File.open("#{base_path}#{fname}#{ext_v2}", 'w')
  #outfile.write(data.to_json)
  #outfile.close
end

puts top_level_counts
puts low_level_counts