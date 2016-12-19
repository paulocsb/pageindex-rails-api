class Api::V1::PageSerializer < ActiveModel::Serializer
  attributes :id, :url, :content
end