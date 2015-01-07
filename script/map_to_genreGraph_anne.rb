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
    'underground hip hop'
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

def map_tags_to_graph (tags, graph)
  top_level = []
  low_level = []
  tags.each do |tag|
    graph.keys.each do |top_level_genre|
      if graph[top_level_genre].include?(tag)
        top_level.push(top_level_genre)
        low_level.push(tag)
      else
        top_level = ['unknown']
      end
    end
  end
  return top_level, low_level
end

anne_litt_data = ['Anne_Litt_2010_tagged', 'Anne_Litt_2011_tagged', 'Anne_Litt_2012_tagged',
                  'Anne_Litt_2013_tagged']
base_path = './script_data/'
ext = '.json'
anne_litt_data.each do |fname|
  f = File.open("#{base_path}#{fname}#{ext}", 'r')
  data = ''
  f.each_line do |line|
    data = JSON.parse(line)
  end
  f.close

  days = data.keys

  days.each do |day|
    data[day].each do |track|
      if track['tags'].nil? || track['tags'].length == 0
        track['tags'] = {'top_level' => ['unknown']}
      else
        mapped_tags = map_tags_to_graph(track['tags'], graph)
        track['tags'] = {'top_level' => mapped_tags[0], 'low_level' => mapped_tags[0]}
      end
    end
  end

  ext_v2 = '_v2.json'
  outfile = File.open("#{base_path}#{fname}#{ext_v2}", 'w')
  outfile.write(data.to_json)
  outfile.close
end