#!/usr/bin/env python3
""" This module contains the `Server` class """
import csv
import math
from typing import List, Tuple


def index_range(page: int, page_size: int) -> Tuple[int]:
    """ Returns a tuple containing the start and end indexes for pagination """
    return ((page - 1) * page_size, page * page_size)


class Server:
    """ Server class to paginate a database of popular baby names """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """ Cached dataset """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """ Returns the appropriate page of the dataset """
        # Assert that both page and page_size are integers
        assert isinstance(page, int), "page must be an integer"
        assert isinstance(page_size, int), "page_size must be an integer"
        # Assert that both page and page_size are greater than 0
        assert page > 0, "page must be greater than 0"
        assert page_size > 0, "page_size must be greater than 0"

        idx_range = index_range(page, page_size)
        self.dataset()
        try:
            page = self.__dataset[idx_range[0]:idx_range[1]]
            return page
        except IndexError:
            return []
