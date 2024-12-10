#!/usr/bin/env python3
"""
Deletion-resilient hypermedia pagination
"""
import csv
import math
from typing import List, Dict, Union


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None
        self.__indexed_dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def indexed_dataset(self) -> Dict[int, List]:
        """Dataset indexed by sorting position, starting at 0
        """
        if self.__indexed_dataset is None:
            dataset = self.dataset()
            truncated_dataset = dataset[:1000]
            self.__indexed_dataset = {
                i: dataset[i] for i in range(len(dataset))
            }
            # pprint.pprint(self.__indexed_dataset)
        return self.__indexed_dataset

    def get_hyper_index(self, index: int = None, page_size: int = 10)\
            -> Dict[str, Union[int, List[List]]]:
        """
        Retrieve a hypermedia-style pagination dictionary from a given index.
        """
        # Assert that index and page_size are integers
        assert isinstance(index, int), "index must be an integer"
        assert isinstance(page_size, int), "page_size must be an integer"
        # Assert that index is not less than 0
        assert index >= 0, "index must be greater than or equal to 0"
        # Assert that page_size is greater than 0
        assert page_size > 0, "index must be greater than 0"
        hyper = {}
        hyper['index'] = index
        hyper['page_size'] = page_size
        hyper['data'] = []
        count = 0

        for key in range(index, len(self.__dataset)):
            if count == page_size:
                break
            data = self.__indexed_dataset.get(key)
            if data is not None:
                hyper['data'].append(data)
                count += 1
                hyper['next_index'] = key + 1

        return hyper
