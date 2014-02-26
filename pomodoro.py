""" The flask service for the pomordoro application"""
import os
from os import path
from flask import Flask
#from flask import render_template
from flask import make_response
import flask.helpers as helpers

class PomodoroApplicationService(object):
    """ The class containing the service """
    app = Flask(__name__)
    # static content will be served by the proxy.  to try to do that
    # with flask, see
    # http://werkzeug.pocoo.org/docs/middlewares/
    # http://flask.pocoo.org/docs/quickstart/#hooking-in-wsgi-middlewares
    
    @classmethod
    def get_flask_app(cls):
        """ get hold of the flask app"""
        return cls.app

    @staticmethod
    @app.route('/')
    def site_root():
        """site's root method"""
        response = make_response(open('./app/index.html').read())
        return response
    
    @staticmethod
    @app.route('/favicon.ico')
    def favicon():
        """little icon for fav"""
        favicon_path = os.path.join('app', 'img', 'favicon.ico')
        helpers.send_file(favicon_path)
    	
    @staticmethod
    @app.route('/<path:urlpath>/')
    def other_paths(urlpath):
        """ for all other paths"""
        if urlpath == "favicon.ico":
            return ""
        file_system_path = path.join('./', urlpath)
        if os.path.isdir(file_system_path):
            return PomodoroApplicationService.render_directory(file_system_path)
        else:
            opened_file = open(file_system_path)
            readed = opened_file.read()
            stringresponse = make_response(readed)
            return stringresponse
    
    @classmethod
    def render_directory(cls, dirpath):
        """show directory contents (just list of strings)"""
        print("------dirpath---------" + dirpath)
        list_contents = os.listdir(dirpath)
        print("------list contents----" + str(list_contents))
        response_string = "<html>"
        for entry in list_contents:
            response_string += entry + '\n</br>\n'
        response_string += entry + '</html>'
        print("---the responseString------" + str(response_string))
        response = make_response(''.join(response_string))
        return response

if __name__  == '__main__':
    PomodoroApplicationService.get_flask_app().debug = True
    PomodoroApplicationService.get_flask_app().run()
