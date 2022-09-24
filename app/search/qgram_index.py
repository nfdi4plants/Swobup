import readline  # NOQA
import sys
import math
import time

from dotenv import load_dotenv

load_dotenv()

# Uncomment to use C version of prefix edit distance calculation.
# You have to install the module using the provided ped_c/setup.py
# first.
from ped_c import ped

# Comment to use C version of prefix edit distance calculation
#from ped_python import ped

# from ..neo4j.neo4jConnection import Neo4jConnection

from db import Neo4jConnection


class QGramIndex:
    """
    A QGram-Index.
    """

    def __init__(self, q):
        """
        Creates an empty qgram index.
        """

        self.q = q
        self.inverted_lists = {}  # The inverted lists
        self.padding = "$" * (q - 1)
        self.words = []
        self.scores = []

        # counter # of PED
        self.pedCounter = 0
        # counter # of merges
        self.merges = 0
        # counter # of distinct Entities
        self.distinctEnt = 0

    def build_from_db(self):
        print("build index from db")

        db = Neo4jConnection()

        result = db.list_terms()

        print("res", result)

        file_name ="bla"


        entity_id = 0

        # file.readline()

        # commented bufsize to read whole lines in file
        # bufSize = 65536
        # bufFile = file.readlines(bufSize)

        for line in result:
            # entity_name, score, rest_of_line = line.strip().split("\t", 2)
            entity_name = line

            if entity_name is None:
                continue

            # entity_name = entity_name.lower()
            entity_name = self.normalize(entity_name)
            self.words.append(entity_name)
            # self.scores.append(score)

            entity_id += 1

            for qgram in self.compute_qgrams(entity_name):

                if qgram not in self.inverted_lists:
                    # If qgram is seen for the first time, create new list.
                    self.inverted_lists[qgram] = [(entity_id, 1)]

                elif self.inverted_lists[qgram][0][0] == entity_id:

                    # update value if entity is already saved
                    lastValue = self.inverted_lists[qgram][0][1]
                    # add +1 to value
                    self.inverted_lists[qgram][0] = (
                        self.inverted_lists[qgram][0][0],
                        lastValue + 1,
                    )

                    print("ind", line)
                    print(self.inverted_lists[qgram],line)

                else:
                    self.inverted_lists[qgram].append((entity_id, 1))


    def build_from_file(self, file_name):
        """
        Builds the index from the given file (one line per entity, see ES5).

        The entity IDs are one-based (starting with one).

        >>> qi = QGramIndex(3)
        >>> qi.build_from_file("test.tsv")
        >>> sorted(qi.inverted_lists.items())
        ... # doctest: +NORMALIZE_WHITESPACE
        [('$$b', [(2, 1)]), ('$$f', [(1, 1)]), ('$br', [(2, 1)]),
         ('$fr', [(1, 1)]), ('bre', [(2, 1)]), ('fre', [(1, 1)]),
         ('rei', [(1, 1), (2, 1)])]
        """

        # Code from lecture 5
        with open(file_name, "r") as file:
            entity_id = 0

            file.readline()

            # commented bufsize to read whole lines in file
            # bufSize = 65536
            # bufFile = file.readlines(bufSize)

            for line in file:
                entity_name, score, rest_of_line = line.strip().split("\t", 2)

                # entity_name = entity_name.lower()
                entity_name = self.normalize(entity_name)
                self.words.append(entity_name)
                self.scores.append(score)

                entity_id += 1

                for qgram in self.compute_qgrams(entity_name):

                    if qgram not in self.inverted_lists:
                        # If qgram is seen for the first time, create new list.
                        self.inverted_lists[qgram] = [(entity_id, 1)]

                    elif self.inverted_lists[qgram][0][0] == entity_id:

                        # update value if entity is already saved
                        lastValue = self.inverted_lists[qgram][0][1]
                        # add +1 to value
                        self.inverted_lists[qgram][0] = (
                            self.inverted_lists[qgram][0][0],
                            lastValue + 1,
                        )

                    else:
                        self.inverted_lists[qgram].append((entity_id, 1))

    def normalize(self, word):
        """
        Normalize the given string (remove non-word characters and lower case).

        >>> qi = QGramIndex(3)
        >>> qi.normalize("freiburg")
        'freiburg'
        >>> qi.normalize("Frei, burG !?!")
        'freiburg'
        """

        low = word.lower()
        return "".join([i for i in low if i.isalnum()])

    def compute_qgrams(self, word):
        """
        Compute q-grams for padded version of given string.

        >>> qi = QGramIndex(3)
        >>> qi.compute_qgrams("freiburg")
        ['$$f', '$fr', 'fre', 'rei', 'eib', 'ibu', 'bur', 'urg']
        """

        gramList = []

        # add padding ($) symbols
        word = self.padding + word

        for i in range(len(word)):
            # if word length is reached, abort
            if i + self.q > len(word):
                break
            else:
                # create qgrams and append to list
                currentGram = word[i:i + self.q]
                gramList.append(currentGram)

        return gramList

    def merge_lists(self, lists):
        """
        Merges the given inverted lists.

        >>> qi = QGramIndex(3)
        >>> qi.merge_lists([[(1, 2), (3, 1), (5, 1)], [(2, 1), (3, 2), (9,2)]])
        [(1, 2), (2, 1), (3, 3), (5, 1), (9, 2)]
        >>> qi.merge_lists([[(1, 2), (3, 1), (5, 1)], []])
        [(1, 2), (3, 1), (5, 1)]
        >>> qi.merge_lists([[], []])
        []
        """

        # counter # of merges
        self.merges = 0
        # listpointer to going through lists (more than 2 possible)
        lPointer = 1

        outputList = []

        # going through lists, more than two lists are possible
        while lPointer < len(lists):

            # if this is the first time, add first list to outputlists
            if outputList == []:
                outputList = lists[lPointer - 1]

            # list1 is outputlist (last result)
            list1 = outputList
            # list 2 is next list in queue
            list2 = lists[lPointer]
            outputList = []

            lPointer += 1

            pointer1 = 0
            pointer2 = 0

            # add +1 to merge counter
            self.merges += 1

            # merge algorithm from last sheets a little bit modified
            while (pointer1 < len(list1)) or (pointer2 < len(list2)):

                if pointer1 >= len(list1):

                    curTuple = (
                        list2[pointer2][0],
                        list2[pointer2][1],
                    )
                    pointer2 += 1
                    outputList.append(curTuple)
                    continue

                if pointer2 >= len(list2):

                    curTuple = (
                        list1[pointer1][0],
                        list1[pointer1][1],
                    )
                    pointer1 += 1
                    outputList.append(curTuple)
                    continue

                if list1[pointer1][0] == list2[pointer2][0]:
                    newValue = list1[pointer1][1] + list2[pointer2][1]

                    curTuple = (list1[pointer1][0], newValue)
                    outputList.append(curTuple)

                    pointer1 += 1
                    pointer2 += 1

                elif list1[pointer1][0] < list2[pointer2][0]:

                    curTuple = (
                        list1[pointer1][0],
                        list1[pointer1][1],
                    )
                    outputList.append(curTuple)
                    pointer1 += 1

                elif list1[pointer1][0] > list2[pointer2][0]:

                    curTuple = (
                        list2[pointer2][0],
                        list2[pointer2][1],
                    )
                    outputList.append(curTuple)
                    pointer2 += 1

        self.distinctEnt = len(outputList)

        return outputList

    def find_matches(self, prefix, delta):
        """
        Finds all entities y with PED(x, y) <= delta for a given integer delta
        and a given (normalized) prefix x.

        The test checks for a list of triples containing the entity ID,
        the PED distance and its score:

        [(entity id, PED, score), ...]

        The entity IDs are one-based (starting with 1).

        >>> qi = QGramIndex(3)
        >>> qi.build_from_file("test.tsv")
        >>> qi.find_matches("frei", 0)
        [(1, 0, 3)]
        >>> qi.find_matches("frei", 2)
        [(1, 0, 3), (2, 1, 2)]
        >>> qi.find_matches("freibu", 2)
        [(1, 2, 3)]
        """

        output = []

        # calculate qgrams from griven prefix
        prefixGrams = self.compute_qgrams(prefix)

        # calculate the border to exclude not needed grams
        border = len(prefix) - (self.q * delta)

        collected = []

        # check if a gram is in invertedList, if yes append to collected
        for gram in prefixGrams:
            if self.inverted_lists.get(gram) is None:
                continue
            else:
                collected.append(self.inverted_lists.get(gram))

        # merge all collected lists
        items = self.merge_lists(collected)

        # going through all items in list, calculate ped only
        # if value is grater than the border
        for item in items:

            if (item[1]) >= border:
                editDistance = ped(prefix, self.words[item[0] - 1], delta)
                self.pedCounter += 1
                # if calculated ped <= delta append
                if editDistance <= delta:
                    output.append(
                        (item[0], editDistance)
                    )

        return output

    def rank_matches(self, matches):
        """
        Ranks the given list of (entity id, PED, s), where PED is the PED
        value and s is the popularity score of an entity.

        The test check for a list of triples containing the entity ID,
        the PED distance and its score:

        [(entity id, PED, score), ...]

        >>> qi = QGramIndex(3)
        >>> qi.rank_matches([(1, 0, 3), (2, 1, 2), (2, 1, 3), (1, 0, 2)])
        [(1, 0, 3), (1, 0, 2), (2, 1, 3), (2, 1, 2)]
        """

        # implemented bubblesort but this is slower
        # than python derived methods.

        # for i in range(0,len(matches)):
        #     for j in range(0,len(matches)-i-1):

        #         if matches[j][1] > matches[j+1][1]:
        #             matches[j], matches[j+1] = matches[j+1],matches[j]

        # #print(matches)

        # for i in range(0,len(matches)):
        #     for j in range(0,len(matches)-i-1):

        #         if matches[j][1] == matches[j+1][1]:
        #             if matches[j][2] < matches[j+1][2]:
        #                 matches[j], matches[j+1] = matches[j+1],matches[j]

        # #print(matches)

        # return matches

        # sort list second value is ascending, third value is descending
        #return sorted(matches, key=lambda tup: (tup[1], -tup[2]))
        # return sorted(matches)

        return matches

if __name__ == "__main__":
    # Parse the command line arguments.
    if len(sys.argv) < 1:
        print("Usage: python3 %s <file>" % sys.argv[0])
        sys.exit()

    # file_name = sys.argv[1]

    # create qgram
    qi = QGramIndex(3)
    print("reading file...")
    qi.build_from_db()

    while True:

        # set counter to 0
        qi.pedCounter = 0
        qi.merges = 0

        print("type '!q' to quit")
        inp = input("enter your keyword: ")
        if inp == "!q":
            sys.exit(0)
        else:
            # start timer
            startTime = time.monotonic()
            # normalize input
            inp = qi.normalize(inp)

            # calculate delta
            delta = math.floor((len(inp) / 4))

            # find matches
            resultList = qi.find_matches(inp, delta)
            # rank matches
            resultList = qi.rank_matches(resultList)

            # stop timer
            endTime = time.monotonic()

            print("\n---Results: ---\n")

            for index in resultList[0:19]:
                print(qi.words[index[0]-1])
                # print(qi.words, index)

            # for index in resultList[0:5]:
            #
            #     file = open(file_name, "r")
            #     line = file.readlines()
            #
            #     title = line[index[0]].split("\t")[0]
            #
            #     title = "\u001b[4m\u001b[33m" + title + "\u001b[0m"
            #     description = "\u001b[1m" + line[index[0]].split("\t")[2]
            #     description = description + "\u001b[0m"
            #     wikiLink = line[index[0]].split("\t")[3]
            #     wikiMedia = line[index[0]].split("\t")[6]
            #
            #     print(
            #         " * Name: "
            #         + title
            #         + "\n\n"
            #         + "   Description: "
            #         + description
            #         + "\n"
            #         + "   Wikipedia: "
            #         + "\u001b[94m"
            #         + wikiLink
            #         + "\u001b[0m"
            #         + "\n"
            #         + "   Wikimedia: "
            #         + "\u001b[94m"
            #         + wikiMedia
            #         + "\u001b[0m"
            #         + "\n"
            #     )

            print("----------------------------")
            print("additional information: ")
            if len(resultList) > 5:
                print("\nMore than 5 results were found")
                print("Total number of result were: " + str(len(resultList)))

            print("# of PED computations :" + str(qi.pedCounter))
            print("# of merges :" + str(qi.merges))
            print("# distinct entities :" + str(qi.distinctEnt))
            print(
                "# time elapsed :" + str((endTime - startTime) * 1000)
                + " milliseconds"
            )
            print("----------------------------\n")
