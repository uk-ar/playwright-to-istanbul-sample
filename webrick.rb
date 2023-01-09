#! ruby -Ku
# -*- coding: utf-8 -*-
require "webrick"
config = {
    :Port => 8099,
    :DocumentRoot => '.'
}

WEBrick::HTTPServlet::FileHandler.add_handler("erb", WEBrick::HTTPServlet::ERBHandler)
s = WEBrick::HTTPServer.new(config)
s.config[:MimeTypes]["erb"] = "text/html"

trap(:INT){
    s.shutdown
}
s.start
