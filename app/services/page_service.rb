class PageService
  attr_accessor :parse_page
  attr_accessor :html

  def initialize(url)
    @html = HTTParty.get(url).body
  end

  def parse_page
    @parse_page ||= Nokogiri::HTML(html)
  end

  def call
    hash = {}
    %w(a h1 h2 h3).each do |element|
      hash[element] = []
      parse_page.css(element).each do |item|
        if element == "a"
          hash[element].push(item[:href])
        else
          hash[element].push(item.text)
        end
      end
    end
    hash
  end
end
