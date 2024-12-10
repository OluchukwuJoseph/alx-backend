#!/usr/bin/env python3
""" This module contains the `index_range` function """
from typing import Tuple


def index_range(page: int, page_size: int) -> Tuple[int]:
    """ Returns a tuple containing the start and end indexes for pagination """
    return ((page - 1) * page_size, page * page_size)
