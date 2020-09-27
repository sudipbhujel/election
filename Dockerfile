FROM python:3.8 

ENV PYTHONUNBUFFERED 1

# Face-recognition model
RUN apt-get -y update
RUN apt-get install -y --fix-missing \
    build-essential \
    cmake \
    gfortran \
    git \
    wget \
    curl \
    graphicsmagick \
    libgraphicsmagick1-dev \
    libatlas-base-dev \
    libavcodec-dev \
    libavformat-dev \
    libgtk2.0-dev \
    libjpeg-dev \
    liblapack-dev \
    libswscale-dev \
    pkg-config \
    python3-dev \
    python3-numpy \
    software-properties-common \
    zip \
    # web3
    libssl-dev \
    # QR code
    zbar-tools \
    libzbar-dev \
    && apt-get autoremove \
    && apt-get clean && rm -rf /tmp/* /var/tmp/*
        
COPY ./requirements.txt /requirements.txt
RUN pip install -r requirements.txt

RUN mkdir /backend
WORKDIR /backend
COPY ./backend /backend

RUN mkdir -p /vol/web/media
RUN mkdir -p /vol/web/static

RUN useradd -ms /bin/bash user
RUN chown -R user:user /vol/
RUN chmod -R 755 /vol/web
USER user