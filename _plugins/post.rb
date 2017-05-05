Jekyll::Hooks.register :site, :post_write do |hook|
  `./post-build.sh`
end
