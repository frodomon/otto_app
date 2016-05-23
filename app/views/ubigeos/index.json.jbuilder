json.array!(@ubigeos) do |ubigeo|
  json.extract! ubigeo, :id, :ubigeo_id, :name, :parent_id
  json.url ubigeo_url(ubigeo, format: :json)
end
