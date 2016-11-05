class Api::V1::PageSerializer < ActiveModel::Serializer
  attributes :url, :content
end