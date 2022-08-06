from distutils.core import setup, Extension

mod = Extension('ped_c', sources=['ped_c_module.c'])

setup(name='ped_c',
      version='0.1',
      description='',
      ext_modules=[mod]
)
