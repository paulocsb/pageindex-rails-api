class Page < ApplicationRecord
	validates :url, presence: true
  validate :url_accessible?, if: "Rails.env.production?"

  before_create :set_content

  def set_content
    self.content ||= PageService.new(self.url).call
  end
  private :set_content

  def url_accessible?
    success = begin
      response = HTTParty.get(self.url)
      (response.code == 200 || response.code == 302)
    rescue
      false
    end
    raise ErrorService::HTTPInvalidError.new() unless success
  end
  private :url_accessible?
end
